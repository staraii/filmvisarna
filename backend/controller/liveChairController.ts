import { db } from "../index.js";

export default class LiveChairController {
  public async fetchLiveChairs(id: number) {
    try {
      const query = "SELECT seats FROM fullBookings WHERE screeningId =?";
      const values = id;
      let result = await db.execute(query, [values]);
      return result;
    } catch (error) {
      console.error("Error fetching from database", error);
    }
  }
}
