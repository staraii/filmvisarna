//Data service for user-related operations.
// Communication layer between the application logic and the database
// Handle inserting users into the database and retreving user information when needed. 


import { db } from '../index.js'; 
import { RegisterUser } from '../types/userTypes.js';

// Create a new user and insert into the database
export const createUser = async (userData: RegisterUser) => {
  const { firstName, lastName, email, password, phone } = userData;

  try {
    const defaultRole = "user"; 
  
    // Insert user data into the database using a prepared statement
    const [result] = await db.execute(
      'INSERT INTO users (firstName, lastName, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, email, password, phone, defaultRole]
    );
    
   
    return result;
  } catch (error) {
    
    console.error('Error inserting user:', error);
    throw error; 
  }
};

// Find a user by their email
export const findUserByEmail = async (email: string) => {
  try {
   
    const [rows]: any = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    
   
    return rows[0];
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error; 
  }
};

// Find a user by their ID (used for authentication or session validation)
export const findUserById = async (id: number) => {
  try {
    // Look up a user by their unique ID in the database
    const [rows]: any = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    
    
    return rows[0]
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error; 
  }
};

// Fetch user bookings by email (calls an external API)
export const fetchUserBookings = async (email: string | null) => {
  if (!email) {
    throw new Error("Email is required to fetch bookings.");
  }

  try {
    // Send a GET request to the API to fetch bookings for the user
    const response = await fetch(`/api/bookings/fullBookings?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    return await response.json();
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};
