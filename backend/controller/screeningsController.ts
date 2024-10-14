import { db } from "../index.js";

export default class ScreeningsController {
  public async getScreenings(): Promise<any> {
    const result = await db.query("SELECT * FROM fullScreenings;");
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
  public async updateScreening(data: any, id: number): Promise<any> {
    const query = `UPDATE screenings SET movieId=?, theatreId=?, dateTime=? WHERE id=?`;
    const values = [data.movieId, data.theatreId, data.dateTime, id];

    let result = await db.query(query, values);
    return result;
  }
  public async deleteScreening(id: number): Promise<any> {
    const query = `DELETE FROM screenings WHERE id=?`;
    let result = db.query(query, id);
    return result;
  }
  public async getScreeningById(id: number): Promise<any> {
    const result = await db.query(
      `SELECT * FROM fullScreenings where screeningId=${id}`
    );
    return result;
  }
  public async getScreeningsByTitle(title: string): Promise<any> {
    const query = `SELECT * FROM fullScreenings where movieTitle LIKE ?`;
    const value = `%${title}%`;
    let result = db.query(query, value);
    return result;
  }
}
