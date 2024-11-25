import { Router } from 'express';
import { login, logout, getLoggedInUser, register } from '../controller/authController.js';
import { checkSession } from '../controller/authController.js';
import acl from '../middleware/acl.js';
const router = Router();

// Public routes
// POST: Register
router.post('/api/register', acl, register); 

// POST: Login
router.post('/api/login', acl, login); 

// GET: Check if user is logged in
router.get('/api/login', acl, getLoggedInUser); 

// DELETE: Logout
router.delete('/api/login', acl, logout); 

// Route to check if session is active
router.get('/api/auth/check-session', acl, checkSession);

export default router;

