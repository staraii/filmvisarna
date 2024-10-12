var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getTicketTypes } from '../services/ticketService.js';
export const getTicketTypesHandler = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketTypes = yield getTicketTypes(); // Call the service
        res.json({ ticketTypes }); // Send the response
    }
    catch (error) {
        console.error('Error fetching ticket types:', error);
        res.status(500).json({ message: 'Error fetching ticket types' });
    }
});
//# sourceMappingURL=ticketController.js.map