// routes/ticketRouter.ts
import { Router } from 'express';
import { getTicketTypesHandler } from '../controller/ticketController.js';
import { isAuthenticated } from '../middleware/authmiddleware.js'; // Import your authentication middleware
const router = Router();
// Protected route to get ticket types
router.get('/api/tickets', isAuthenticated, getTicketTypesHandler); // Use the isAuthenticated middleware
export default router;
//# sourceMappingURL=ticketRouter.js.map