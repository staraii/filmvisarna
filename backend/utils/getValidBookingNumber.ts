import { db } from "../index.js";
import generateBookingNumber from "./generateBookingNumber.js";
import { RowDataPacket } from "mysql2";

interface IsValidBookingNumber extends RowDataPacket {
  count: number;
}

const isBookingNumberValid = async (bookingNumber: string): Promise<boolean> => {
  const sql = "SELECT COUNT(*) as count FROM `bookings` WHERE `bookingNumber` = ?";
  const [rows] = await db.execute<IsValidBookingNumber[]>(sql, [bookingNumber]);
  const count = rows[0].count;
  return count === 0;
};

const getValidBookingNumber = async (): Promise<string> => {
  let bookingNumber = "";
  let isValid = false;
  while (!isValid) {
    bookingNumber = generateBookingNumber();
    isValid = await isBookingNumberValid(bookingNumber);
  }
  return bookingNumber;
};

export default getValidBookingNumber;