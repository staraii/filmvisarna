import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail, findUserById } from '../services/userService.js';
import { RegisterUser, LoginUser } from '../types/userTypes.js';


// Registration function

export const register = async (req: Request, res: Response) => {
  // Destructure only the required fields from the request body
  const { firstName, lastName, email, password, phone = 'user' }: RegisterUser = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({ message: 'Alla fält måste fyllas i.' });
  }

  try {
    const normalizedEmail = email.toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail); // Check if user already exists

    if (existingUser) {
      return res.status(400).json({ message: 'E-post som redan används' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hash password

    // Create a new user
    await createUser({
      firstName: firstName, 
      lastName: lastName,   
      email: normalizedEmail,
      password: hashedPassword,
      phone,
      role: 'user',
    });

    

    res.status(201).json({ message: 'Användaren skapades' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Login Function

export const login = async (req: Request, res: Response) => {
  const { email, password }: LoginUser = req.body;

  try {
    const user = await findUserByEmail(email.toLowerCase()); // Look up user by email
    if (!user) {
      return res.status(401).json({ message: 'Ogiltiga användaruppgifter' });
    }

    if (!user.password) {
      return res.status(500).json({ message: 'Användaren har inget lösenord inställt' });
    }

    if (req.session.userId) {
      return res.status(400).json({ message: 'Användaren är redan inloggad' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);// Check if provided password matches hashed password
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Ogiltiga användaruppgifter' });
    }

    // Save the user's ID in session
    req.session.userId = user.id;
    req.session.userEmail = user.email; 
    req.session.userRole = user.role;
    
    

     // Return the user's email along with a success message
   res.json({
      message: 'Inloggningen lyckades',
      email: user.email,
      role: user.role, 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
};

// GET /api/login: Check if user is logged in
export const getLoggedInUser = async (req: Request, res: Response) => {
  if (!req.session.userId) {
    req.session.userRole = 'visitor'; 
    return res.status(401).json({ message: 'Ingen användare är inloggad' });
  }

  try {
    const user = await findUserById(req.session.userId);

    if (!user) {
      return res.status(401).json({ message: 'Ingen användare är inloggad' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role, 
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Error fetching logged-in user:', error);
    res.status(500).json({ message: 'Error fetching logged-in user' });
  }
};

// Session check 
export const checkSession = async (req: Request, res: Response) => {
  if (req.session.userId) {
    // If user session is valid, respond with user details or a success message
    res.json({
      isAuthenticated: true,
      user: {
        id: req.session.userId,
        email: req.session.userEmail,  
        role: req.session.userRole,
      },
    });
  } else {
    req.session.userRole = 'visitor';
    return res.json({
      isAuthenticated: false,
      role: 'visitor',  
    });
  }
};

// DELETE /api/login: Logout Function
export const logout = (req: Request, res: Response) => {
 
  if (!req.session || !req.session.userId) {
    return res.status(200).json({ message: 'Ingen användare är inloggad.' }); 
  }

  // Destroy the session to log the user out
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'An error occurred while logging out.' });
    }
    res.status(200).json({ message: 'Utloggad.' });
  });
};
