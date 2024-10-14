import { db } from "../index.js";

export default class ScreeningsController {
  public async getScreenings(): Promise<any> {
    const result = await db.query("SELECT * FROM fullScreenings;");
    return result;
  }
}
