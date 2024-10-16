import { db } from "../index.js";

export default class ScreeningsController {
  public async getScreenings(): Promise<any> {
  const result = await db.query("SELECT * FROM fullScreenings;"); // Make sure your database connection is set up properly
  return result; // Ensure this returns the expected format
}

  public async createScreening(data: any): Promise<any> {
    const query = `
    INSERT INTO screenings (movieId, theatreId, dateTime, userId)
    VALUES (?, ?, ?, ?)
    `;
    const values = [data.movieId, data.theatreId, data.dateTime, data.userId]; // Include userId
    let result = await db.query(query, values);
    return result;
  }

  public async updateScreening(data: any, id: number): Promise<any> {
    const query = `UPDATE screenings SET movieId=?, theatreId=?, dateTime=? WHERE id=?`;
    const values = [data.movieId, data.theatreId, data.dateTime, id];

    let result = await db.query(query, values);
    return result;
  }

  public async deleteScreening(id: number): Promise<any> {
    const query = `DELETE FROM screenings WHERE id=?`;
    let result = await db.query(query, [id]); // Use array for parameter
    return result;
  }

  public async getScreeningById(id: number): Promise<any> {
    const query = `SELECT * FROM fullScreenings where screeningId=?`;
    const value = id;
    let result = await db.query(query, value);


 public async getScreeningsByUserId(userId: number): Promise<any> {
    const query = `SELECT * FROM fullScreenings WHERE userId = ?`; 
    const values = [userId]; 
    const result = await db.query(query, values);
    return result;
}

  public async getScreeningsByTitle(title: string): Promise<any> {
    const query = `SELECT * FROM fullScreenings where movieTitle LIKE ?`;
    const value = `%${title}%`;
    let result = await db.query(query, [value]); // Use array for parameter
    return result;
  }
}

