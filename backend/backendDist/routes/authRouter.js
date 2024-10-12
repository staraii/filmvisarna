import { Router } from 'express';
import { login, logout, register } from '../controller/authController.js';
const router = Router();
// Update routes to include the '/api' prefix
router.post('/api/register', register);
router.post('/api/login', login);
router.post('/api/logout', logout);
export default router;
//# sourceMappingURL=authRouter.js.map