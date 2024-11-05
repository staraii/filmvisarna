import { db } from "../index.js";
import getValidBookingNumber from "../utils/getValidBookingNumber.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

interface IsBookingId extends RowDataPacket {
  id: number;
}
type Seat = {
  seatId: number;
  ticketTypeId: number;
};

const createNewBooking = async (userId: number | null, email: string, screeningId: number, seats: Seat[]) => {
  const bookingNumber = await getValidBookingNumber();
  let bookingId:number;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [bookingResult] = await connection.execute<ResultSetHeader>(
         "INSERT INTO `bookings` (`userId`, `screeningId`, `email`, `bookingNumber`, `bookingDate`) VALUES (?, ?, ?, ?, ?)",
      [userId, screeningId, email, bookingNumber, new Date().toLocaleString("sv-SE")]
    );
    bookingId = bookingResult.insertId;
    console.log("bookingId1: " + bookingId)
    const seatsToBook = seats.map((seat) =>
      connection.execute(
        "INSERT INTO `bookedSeats` (`bookingId`, `seatId`, `screeningId`, `ticketTypeId`) VALUES (?, ?, ?, ?)",
        [bookingId, seat.seatId, screeningId, seat.ticketTypeId]
      )
    );
    await Promise.all(seatsToBook);
    await connection.commit();
  } catch (error) {
    console.error(error);
    await connection.rollback();
    return false;
  } finally {
    connection.release();
  }
  return {bookingId, bookingNumber}
};
const getBookingValidation = async (bookingId: number) => {
  const [booking] = await db.execute<RowDataPacket[]>("SELECT * FROM `fullBookings` WHERE `bookingId` = ?", [bookingId]);
  if (booking.length === 0) {
    return false
  }
  return booking;
}


const updateBookingStatus = async (bookingNumber: string, isPayed: string, isActive: string) => {
  const key = isPayed ? "`isPayed`" : "`isActive`";
  const values = [isPayed ? isPayed : isActive, bookingNumber]
  const sql = "UPDATE `bookings` SET " + key + " = ? WHERE `bookingNumber` = ? LIMIT 1";
  try {
    const [result] = await db.execute<ResultSetHeader>({ sql, values });
    if (result.affectedRows === 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// DELETE /api/bookings/:bookingNumber/:email
const deleteBooking = async (bookingNumber: string, email: string, userId: string) => {
  let sql = "SELECT `id` FROM `bookings` WHERE `bookingNumber` = ?";
  const values = [bookingNumber];
  if (email) {
    sql += " AND `email` = ?";
    values.push(email);
  }
  if (userId) {
    sql += " AND `userId` = ?";
    values.push(userId);
  }
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [booking] = await connection.execute<IsBookingId[]>(sql, values);
    if (!booking[0] || (booking[0] && !booking[0].id)) {
      throw new Error("No valid resource");
    }
    const bookingId = booking[0].id;

    await connection.execute(
      "DELETE FROM `bookedSeats` WHERE `bookingId` = ?",
      [bookingId]
    );
    await connection.execute("DELETE FROM `bookings` WHERE `id` = ?", [
      bookingId,
    ]);
    await connection.commit();
    
  } catch (error) {
    await connection.rollback();
    console.error(error);
    return false;
  } finally {
    connection.release();
  }
  return true;
};

export default {
  createNewBooking,
  getBookingValidation,
  deleteBooking,
  updateBookingStatus
};
