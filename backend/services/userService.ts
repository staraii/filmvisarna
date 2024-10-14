//Data service for user-related operations.
// Bridge between logic and the database
// Handle inserting users into the database and retreving user information when needed. 


import { db } from '../index.js'; 
import { RegisterUser } from '../types/userTypes.js';

// Create a new user and insert into the database
export const createUser = async (userData: RegisterUser) => {
  const { firstname, lastname, email, password, phone, role } = userData;

  try {
    // Insert user data into the 'users' table
    const [result] = await db.query(
      'INSERT INTO users (firstName, lastName, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, email, password, phone, role]
    );
    
    // Return the insertion result (could include the inserted ID)
    return result;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error; // Propagate the error to the caller
  }
};

// Find a user by their email
export const findUserByEmail = async (email: string) => {
  try {
    // Query the 'users' table for a user with the provided email
    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    // Return the first user found or undefined if no user found
    return rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error; // Propagate the error to the caller
  }
};

// Find a user by their ID (for session-based authentication)
export const findUserById = async (id: number) => {
  try {
    // Query the 'users' table for a user with the provided ID
    const [rows]: any = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    // Return the first user found or undefined if no user found
    return rows[0];
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error; // Propagate the error to the caller
  }
};