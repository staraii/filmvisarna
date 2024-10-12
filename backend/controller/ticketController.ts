// controllers/ticketController.ts
import { Request, Response } from 'express';
import { getTicketTypes } from '../services/ticketService.js';

export const getTicketTypesHandler = async (_req: Request, res: Response) => {
  try {
    const ticketTypes = await getTicketTypes(); // Call the service
    res.json({ ticketTypes }); // Send the response
  } catch (error) {
    console.error('Error fetching ticket types:', error);
    res.status(500).json({ message: 'Error fetching ticket types' });
  }
};

