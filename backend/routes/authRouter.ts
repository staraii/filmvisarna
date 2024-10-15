// Route file for authentications
import { Router } from 'express';
import { login, logout, getLoggedInUser, register } from '../controller/authController.js';
import { checkAcl } from '../middleware/checkAcl.js'; // Import the checkAcl middleware

const router = Router();

// Public routes
// POST: Register
router.post('/api/register', register); // Accessible to all users (visitors)

// POST: Login
router.post('/api/login', login); // Accessible to all users (visitors, users, admins)

// GET: Check if user is logged in
router.get('/api/login', checkAcl, getLoggedInUser); // Use checkAcl if you want to restrict to logged-in users

// DELETE: Logout
router.delete('/api/login', checkAcl, logout); // Use checkAcl to restrict logout to logged-in users

export default router;

