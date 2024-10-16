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
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [bookingResult] = await connection.execute<ResultSetHeader>("INSERT INTO `bookings` (`userId`, `screeningId`, `email`, `bookingNumber`) VALUES (?, ?, ?, ?)",
      [userId, screeningId, email, bookingNumber]
    );
    const bookingId = bookingResult.insertId;
    const seatsToBook = seats.map((seat) =>
        connection.execute("INSERT INTO `bookedSeats` (`bookingId`, `seatId`, `screeningId`, `ticketTypeId`) VALUES (?, ?, ?, ?)", [bookingId, seat.seatId, screeningId, seat.ticketTypeId]));
    await Promise.all(seatsToBook);
    await connection.commit();
  } catch (error) {
    console.error(error);
    await connection.rollback();
    return false
  } finally {
    connection.release();
  }
  // ADD EMAIL FUNCTION HERE
  return bookingNumber
}

const updatePaymentStatus = async (bookingNumber: string, isPayed: number) => {
  try {
    const sql = "UPDATE `bookings` SET `isPayed` = ? WHERE `bookingNumber` = ? LIMIT 1";
    const values = [isPayed, bookingNumber];
    const [result] = await db.execute<ResultSetHeader>({ sql, values });
    const updated = result.affectedRows;
    if (updated != 1) {
      return false
    }
  return true;
  } catch (error) {
    console.log(error)
    return false
  }
}

const updateActiveStatus = async (bookingNumber: string, status: number) => {
  try {
    const sql = "UPDATE `bookings` SET `isActive` = ? WHERE `bookingNumber` = ? LIMIT 1";
    const values = [status, bookingNumber];
    const [result] = await db.execute<ResultSetHeader>({ sql, values });
    if (result.affectedRows === 0) {
      return false;
    }
    return true
  } catch (error) {
    console.log(error);
    return false
  }
}


// DELETE /api/bookings/:bookingNumber/:email
const deleteBooking = async (bookingNumber: string, email: string) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [booking] = await connection.execute<IsBookingId[]>("SELECT `id` FROM `bookings` WHERE `email` = ? AND `bookingNumber` = ?", [email, bookingNumber]);
    const bookingId = booking[0].id;
    if (!bookingId) {
      return false;
    }
    await connection.execute("DELETE FROM `bookedSeats` WHERE `bookingId` = ?", [bookingId]);
    await connection.execute("DELETE FROM `bookings` WHERE `id` = ?", [bookingId]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.log(error);
    return false
  } finally {
    connection.release();
  }
  return true;
}


export default { createNewBooking, deleteBooking, updatePaymentStatus, updateActiveStatus };