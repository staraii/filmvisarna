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

const ACL_STATUS = process.env.ACL_STATUS || "OFF";

export const aclAuth = async (req: Request, res: Response, next: NextFunction) => {
  console.log("acl status: " + ACL_STATUS)
  if (ACL_STATUS === "OFF") {
    return next()
  }
  const reservedQueryParams = ["sort", "limit", "offset"];
  try {
    const { path, params, query, session, method } = req;
    console.log("path: " + path.split(`/${params.table}`)[0] + " table: " + params.table + " query: " + query + " method: " + method);
    // userRole should default to "visitor", but other roles can be set for testing and debugging
    const userRole = session?.userRole || "user";
    // userId should default to null, but a userId can be set for testing and debugging
    const userId = session?.userId || 18;
    let sql = "SELECT * FROM `acl` WHERE `restApiRoute` = ? AND `method` = ? AND `tableName` = ? AND (FIND_IN_SET(?, `userRoles`) > 0)";
    const queryParams = [path.split(`/${params.table}`)[0], method, params.table, userRole];
    // If query parameters are available, add keys to queryParams array and add to sql string
    if (query && Object.keys(query).length > 0) {
      //console.log("query.length: " + Object.keys(query).length);
      const queryFields = Object.keys(query).filter((key) => !reservedQueryParams.includes(key));
      const queryFields2 = queryFields.map((field) => `%${field}%`);
      if (queryFields.length > 0) {
        // Alter "fieldName" column in db to a set of values instead of text, then use FIND_IN_SET()
        //sql += " AND " + Array(queryFields.length).fill("(FIND_IN_SET(?, `fieldName`) > 0)").join(" AND ");

        // Temporary solution when "fieldName" column is NOT a SET.
        sql += " AND " + Array(queryFields.length).fill("`fieldName` LIKE ?").join(" AND ");
      }
      //console.log("queryFields.length: " + queryFields.length)
      //console.log(sql);
      queryParams.push(...queryFields2);

      //console.log(queryParams)
    }
    const [rows] = await db.execute<AclRules[]>(sql, queryParams);
    const rule = rows[0];
    if (!rule) {
      return res.status(400).json({ message: "Bad request" });
    }

    if (rule.fieldMatchingUserId !== null && (query[`${rule.fieldMatchingUserId}`] && Number(query[`${rule.fieldMatchingUserId}`]) !== userId)){
      //console.log("matching field: " + rule.fieldMatchingUserId);
      //console.log("user input id: " + query[`${rule.fieldMatchingUserId}`])
      //console.log("userId: " + userId);
      return res.status(401).json({ message: "Unauthorized request" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
} 