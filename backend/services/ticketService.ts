// services/ticketService.ts
import { db } from '../index.js'; // Adjust the import according to your file structure
import { TicketType } from '../types/userTypes.js'; // Assuming you have a TicketType type defined
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket

// Function to fetch all ticket types from the database
export const getTicketTypes = async (): Promise<TicketType[]> => {
  try {
    // Perform the query to get ticket types
    const [rows]: [RowDataPacket[], any] = await db.query('SELECT * FROM ticketTypes');
    
    // Map the rows to your TicketType
    const ticketTypes: TicketType[] = rows.map(row => ({
      id: row.id,
      type: row.type,
      price: row.price,
    }));

    return ticketTypes; // Return the array of TicketType
  } catch (error) {
    console.error('Error fetching ticket types:', error);
    throw error; // Propagate the error to the caller
  }
};



