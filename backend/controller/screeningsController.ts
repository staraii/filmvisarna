import { db } from "../index.js";

export default class ScreeningsController {
  public async getScreenings(): Promise<any> {
    const result = await db.query("SELECT * FROM fullScreenings;");
    return result;
  }
  public async getScreeningById(id: number): Promise<any> {
    const result = await db.query(
      `SELECT * FROM fullScreenings where screeningId=${id}`
    );
    return result;
  }
  public async createScreening(data: any): Promise<any> {
    const query = `
    INSERT INTO screenings (movieId, theatreId, dateTime)
    VALUES (?, ?, ?)
  `;
    const values = [data.movieId, data.theatreId, data.dateTime];
    let result = await db.query(query, values);
    return result;
  }
}