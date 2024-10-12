import { db } from '../index.js'; // Import the db pool from your index.ts
import { RegisterUser } from '../types/userTypes.js';


export const createUser = async (userData: RegisterUser) => {
  const { firstname, lastname, email, password, phone, role } = userData;

  try {
    const [result] = await db.query(
      'INSERT INTO users (firstName, lastName, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, email, password, phone, role]
    );
    return result; // Return the result of the insertion
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error; // Propagate the error to the caller
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Return the first user found or undefined if not found
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error; // Propagate the error to the caller
  }
}; 