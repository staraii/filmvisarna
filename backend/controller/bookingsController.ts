import { db } from "../index.js";
import MailService from "../services/mailService.js";

let mailService = new MailService();

export default class BookingsController {
  public async handleMail(bookingId: number): Promise<any> {
    const query = `SELECT * FROM fullBookings WHERE bookingId=?;`;
    const value = bookingId;
    let data = await db.query(query, value);
    let result = await mailService.sendMail(data[0]);

    return result;
  }
}
