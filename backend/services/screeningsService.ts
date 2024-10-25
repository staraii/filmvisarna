import { db } from "../index.js";

const getScreenings = async () => {
  const query = "SELECT * FROM fullScreenings;";
  const [result] = await db.query(query);
  return result;
};
const createScreening = async (values: Object) => {
  const query = `
    INSERT INTO screenings (movieId, theatreId, dateTime)
    VALUES (?, ?, ?)`;
  const [result] = await db.execute(query, [values]);
  return result;
};

const updateScreening = async (values: Object) => {
  const query = `UPDATE screenings SET movieId=?, theatreId=?, dateTime=? WHERE id=?`;
  const [result] = await db.execute(query, [values]);

  return result;
};
const deleteScreening = async (id: number) => {
  const query = `DELETE FROM screenings WHERE id=?`;
  const [result] = await db.execute(query, [id]);
  return result;
};
const getScreeningById = async (id: number) => {
  const query = `SELECT * FROM fullScreenings WHERE screeningId=?`;
  const [result] = await db.query(query, [id]);
  return result;
};
const getScreeningByTitle = async (title: string) => {
  const query = `SELECT * FROM fullScreenings WHERE movieTitle LIKE ?`;
  const likeTitle = `%${title}%`;
  const [result] = await db.query(query, [likeTitle]);
  return result;
};

const getBookingsByBookingNumber = async (bookingNumber: string) => {
  const query = `SELECT * FROM fullBookings WHERE bookingNumber = ?`;

  const [result] = (await db.execute(query, [bookingNumber])) as any;
  return result;
};
export default {
  getScreenings,
  getBookingsByBookingNumber,
  createScreening,
  updateScreening,
  deleteScreening,
  getScreeningById,
  getScreeningByTitle,
};
