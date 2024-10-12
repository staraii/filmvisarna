var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// services/ticketService.ts
import { db } from '../index.js'; // Adjust the import according to your file structure
// Function to fetch all ticket types from the database
export const getTicketTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Perform the query to get ticket types
        const [rows] = yield db.query('SELECT * FROM ticketTypes');
        // Map the rows to your TicketType
        const ticketTypes = rows.map(row => ({
            id: row.id,
            type: row.type,
            price: row.price,
        }));
        return ticketTypes; // Return the array of TicketType
    }
    catch (error) {
        console.error('Error fetching ticket types:', error);
        throw error; // Propagate the error to the caller
    }
});
//# sourceMappingURL=ticketService.js.map