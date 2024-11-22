// Route file for authentications
import { Router } from 'express';
import { login, logout, getLoggedInUser, register } from '../controller/authController.js';
import { checkAcl } from '../middleware/checkAcl.js'; 
import { checkSession } from '../controller/authController.js';

const router = Router();

// Public routes
// POST: Register
router.post('/api/register', register); 

// POST: Login
router.post('/api/login', login); 

// GET: Check if user is logged in
router.get('/api/login', checkAcl, getLoggedInUser); 

// DELETE: Logout
router.delete('/api/login', logout); 

// Route to check if session is active
router.get('/api/auth/check-session', checkSession);

export default router;

