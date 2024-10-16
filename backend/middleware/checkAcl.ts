import { Request, Response, NextFunction } from 'express';
import { db } from '../index.js';
import { RowDataPacket } from 'mysql2';


// Define the structure of your ACL rule
interface AclRule {
  id: number;
  userRoles: string; // Updated from 'role' to 'userRoles'
  method: string;
  restApiRoute: string;
  description?: string; // Optional, if you have a description field
  fieldMatchingUserId?: boolean;
}

// Function to fetch ACL rules based on role, route, and method
async function getAclRule(userRoles: string, route: string, method: string): Promise<AclRule | undefined> {
  try {
    // Execute the query, capturing the result as a tuple
    const [rows]: [RowDataPacket[], any] = await db.query(
      'SELECT * FROM acl_rules WHERE FIND_IN_SET(?, userRoles) AND restApiRoute = ? AND (method = ? OR method = "*")',
      [userRoles, route, method]
    );

    // Check if rows exist and return the first row as AclRule
    if (rows.length > 0) {
      return {
        id: rows[0].id,
        userRoles: rows[0].userRoles, // Changed from 'role' to 'userRoles'
        method: rows[0].method,
        restApiRoute: rows[0].restApiRoute,
        description: rows[0].description,
      } as AclRule; // Cast the result as AclRule
    }

    return undefined; // No matching rule found
  } catch (error) {
    console.error('Error fetching ACL rule:', error);
    throw error;
  }
}

// Middleware to check ACL
export const checkAcl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Assuming you're storing the user's role and id in the session
    const { userId, userRole } = req.session; // Use session properties

    if (!userRole || !userId) {
      return res.status(401).json({ message: 'Unauthorized: No session data' });
    }

    const route = req.path.replace(/\d+$/, '*'); // Get the current route
    const method = req.method; // Get the HTTP method (GET, POST, etc.)

    // Get ACL rule for the user's role, current route, and method
    console.log('Checking ACL for:', userRole, route, method);
    const aclRule = await getAclRule(userRole.toLowerCase(), route, method);

    if (!aclRule) {
      return res.status(403).json({ message: 'Access denied: No matching ACL rule' });
    }

    // Check if the rule requires field matching for user ID
    if (aclRule.fieldMatchingUserId) {
      // Here, instead of comparing to requestedScreeningId, we might want to skip this check
      // because we want users to see their own screenings without specifying IDs in the route
      const requestedScreeningId = req.params.id; // ID from the URL
      if (requestedScreeningId && requestedScreeningId !== userId.toString()) {
        return res.status(403).json({ message: 'Access denied: User ID does not match' });
      }
    }

    next(); // If the rule allows access, proceed to the next middleware/controller
  } catch (error) {
    console.error('Error in ACL check:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};




