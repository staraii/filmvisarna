// Route file for authentications


import { Router } from 'express';
import { login, logout, getLoggedInUser,register } from '../controller/authController.js';

const router = Router();

// POST: Register
router.post('/api/register', register);

// POST: Login
router.post('/api/login', login);

// GET: Check if user is logged in
router.get('/api/login', getLoggedInUser);

// DELETE: Logout
router.delete('/api/login', logout);

export default router;
