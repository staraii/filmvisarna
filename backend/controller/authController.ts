import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '../services/userService.js';
import { RegisterUser, LoginUser } from '../types/userTypes.js';

// Registration function
export const register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, phone, role }: RegisterUser = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail);
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ 
      firstname, 
      lastname, 
      email: normalizedEmail,
      password: hashedPassword, 
      phone, 
      role 
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Login function
export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginUser = req.body;

  try {
    const user = await findUserByEmail(email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user.id; // Ensure req.session is typed
    res.json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

// Logout function
export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Could not log out' });
    }
    res.json({ message: 'Logout successful' });
  });
};




