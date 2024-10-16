import { db } from "../index.js";

export default class ScreeningsController {
  public async getScreenings(): Promise<any> {
    const result = await db.execute("SELECT * FROM fullScreenings;");
    return result;
  }

  public async createScreening(data: any): Promise<any> {
    const query = `
    INSERT INTO screenings (movieId, theatreId, dateTime)
    VALUES (?, ?, ?)
  `;
    const values = [data.movieId, data.theatreId, data.dateTime];
    let result = await db.execute(query, values);
    return result;
  }
  public async updateScreening(data: any, id: number): Promise<any> {
    const query = `UPDATE screenings SET movieId=?, theatreId=?, dateTime=? WHERE id=?`;
    const values = [data.movieId, data.theatreId, data.dateTime, id];

    let result = await db.execute(query, values);
    return result;
  }
  public async deleteScreening(id: number): Promise<any> {
    const query = `DELETE FROM screenings WHERE id=?`;
    let result = await db.execute(query, id);
    return result;
  }
  public async getScreeningById(id: number): Promise<any> {
    const query = `SELECT * FROM fullScreenings WHERE screeningId=?`;
    const value = id;
    let result = await db.execute(query, value);

    return result;
  }
  public async getScreeningsByTitle(title: string): Promise<any> {
    const query = `SELECT * FROM fullScreenings WHERE movieTitle LIKE ?`;
    const value = `%${title}%`;
    let result = await db.execute(query, value);
    return result;
  }
  public async getBookingsByBookingNumber(bookingNumber: string): Promise<any> {
    const query = `SELECT * FROM fullBookings WHERE bookingNumber = ?`;
    const result = await db.execute(query, [bookingNumber]);
    return result;
  }
}
