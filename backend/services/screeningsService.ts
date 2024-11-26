import { db } from "../index.js";
import { RowDataPacket } from "mysql2";

const getScreenings = async () => {
  const query = "SELECT * FROM fullScreenings;";
  const [result] = await db.execute(query);
  return result;
};
const createScreening = async (values: {
  movieId: number;
  theatreId: number;
  dateTime: string;
}) => {
  console.log(values);
  const query = `INSERT INTO screenings (movieId, theatreId, dateTime) VALUES (?, ?, ?)`;
  const [result] = await db.execute(query, [
    values.movieId,
    values.theatreId,
    values.dateTime,
  ]);
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
  const [result] = await db.execute(query, [id]);
  return result;
};
const getScreeningByTitle = async (title: string) => {
  const query = `SELECT * FROM fullScreenings WHERE movieTitle LIKE ?`;
  const likeTitle = `%${title}%`;
  const [result] = await db.execute(query, [likeTitle]);
  return result;
};

const getBookingsByBookingNumber = async (bookingNumber: string) => {
  const query = `SELECT * FROM fullBookings WHERE bookingNumber = ?`;

  const [result] = (await db.execute(query, [bookingNumber])) as any;
  return result;
};

type FullScreening = {
  screeningId: number;
  movieTitle: string;
  dateTime: string;
  dayName: string;
  day: number;
  month: number;
  week: number;
  time: string;
  theatreName: string;
  numberOfSeats: number;
  numberOfOccupiedSeats: number;
  occupiedSeats: string;
  occupiedPercent: number;
};
type ScreeningDay = FullScreening[];
type ScreeningWeek = ScreeningDay[];
type AllScreenings = ScreeningWeek[];
type FullScreenings = FullScreening[];

const sortScreenings = (screeningsData: FullScreenings) => {
  const sortedScreenings: AllScreenings = [];
  let weekNr: number = screeningsData[0].week;
  let dayNr: number = screeningsData[0].day;
  let week: ScreeningWeek = [];
  let day: ScreeningDay = [];
  screeningsData.forEach((screening) => {
    if (screening.week === weekNr) {
      if (screening.day === dayNr) {
        day.push(screening);
      } else {
        week.push(day);
        day = [];
        dayNr = screening.day;
        day.push(screening);
      }
    } else {
      week.push(day);
      sortedScreenings.push(week);
      day = [];
      week = [];
      dayNr = screening.day;
      weekNr = screening.week;
      day.push(screening);
    }
  });
  return sortedScreenings;
};

const getAllScreenings = async () => {
  const now = new Date().toLocaleString("sv-SE");
  console.log("now: " + now);
  const query = "SELECT * FROM fullScreenings WHERE dateTime >= ?";
  const [result] = await db.execute<RowDataPacket[]>(query, [now]);
  const sortedResults = sortScreenings(result as FullScreenings);
  return sortedResults;
};
export default {
  getScreenings,
  getBookingsByBookingNumber,
  createScreening,
  updateScreening,
  deleteScreening,
  getScreeningById,
  getScreeningByTitle,
  getAllScreenings,
};
