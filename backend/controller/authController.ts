import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail, findUserById } from '../services/userService.js';
import { RegisterUser, LoginUser } from '../types/userTypes.js';

// Registration function

export const register = async (req: Request, res: Response) => {
  // Destructure only the required fields from the request body
  const { firstName, lastName, email, password, phone }: RegisterUser = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({ message: 'All fields must be filled out.' });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail); // Check if user already exists

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hash password

    // Create a new user
    await createUser({
      firstName: firstName, // Ensure this matches your database field
      lastName: lastName,   // Ensure this matches your database field
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      // No role is passed here
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// POST /api/login: Login Function

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginUser = req.body;

  try {
    const user = await findUserByEmail(email.toLowerCase()); // Look up user by email
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.password) {
      return res.status(500).json({ message: 'User has no password set' });
    }

    if (req.session.userId) {
      return res.status(400).json({ message: 'User is already logged in' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);// Check if provided password matches hashed password
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Save the user's ID in session
    req.session.userId = user.id;
    req.session.userRole = user.role;
    

    res.json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

// GET /api/login: Check if user is logged in
export const getLoggedInUser = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'No user is logged in' });
  }

  try {
    // Fetch the user by ID from the database
    const user = await findUserById(req.session.userId);

    if (!user) {
      return res.status(401).json({ message: 'No user is logged in' });
    }

    // Return user details (excluding sensitive info)
    res.json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error fetching logged-in user:', error);
    res.status(500).json({ message: 'Error fetching logged-in user' });
  }
};

// DELETE /api/login: Logout Function
export const logout = (req: Request, res: Response) => {
  // Check if there is a session
  if (!req.session || !req.session.userId) {
    return res.status(200).json({ message: 'No user is logged in.' }); // Custom message
  }

  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred while logging out.' });
    }
    res.status(200).json({ message: 'Successfully logged out.' });
  });
};
