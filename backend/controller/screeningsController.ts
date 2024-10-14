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
}
