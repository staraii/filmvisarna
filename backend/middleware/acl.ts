import { Request, Response, NextFunction } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../index.js";

interface AclRules extends RowDataPacket {
  userRoles: string;
  method: string;
  restApiRoute: string;
  tableName: string;
  fieldName: string;
  fieldMatchingUserId: string;
  comment: string;
}

const reservedQueryParams = ["sort", "limit", "offset"];

export default async function acl(req: Request, res: Response, next: NextFunction){
  const { userEmail, userRole: role } = req.session;
  const userRole = role ? role : "visitor";
  const { path: fullPath, params, query, method } = req;
  const param = Object.values(params)[0]
  const path = param ? fullPath.split(`/${param}`)[0] : fullPath;

  let sql = "SELECT * FROM `acl` WHERE `restApiRoute` = ? AND `method` = ? AND (FIND_IN_SET(?, `userRoles`) > 0)";

  const queryParams = [path, method, userRole ? userRole : "visitor"]

  if (query && Object.keys(query).length > 0) {
 
    const filteredQueryFields = Object.keys(query).filter(
      (key) => !reservedQueryParams.includes(key));
    const queryFields = filteredQueryFields.map((param) => {
      if (param.endsWith(">") || param.endsWith("<") || param.endsWith    ("!")) {
        return param.split(/(!|<|>)/)[0];
      }
      return param;
    })

    if (queryFields.length > 0) {
      sql += " AND " + Array(queryFields.length).fill("(FIND_IN_SET(?, `fieldName`) > 0)").join(" AND ");
    }
    queryParams.push(...queryFields);
  }
  const [rows] = await db.execute<AclRules[]>(sql, queryParams);
  const rule = rows[0];
  
  if (!rule) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  if (
    rule.fieldMatchingUserId !== null &&
    query[`${rule.fieldMatchingUserId}`] &&
    query[`${rule.fieldMatchingUserId}`] !== userEmail
  ) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  next();
}