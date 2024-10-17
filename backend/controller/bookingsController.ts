import { Request, Response } from "express";
import bookingsService from "../services/bookingsService.js";
import { db } from "../index.js";

const regExes = { 
  id: /^[1-9][0-9]*$/,
  bookingNumber: /^[A-Z]{3}[\d]{3}$/,
  email: /^[\w\-.]+@[\w-]+\.+[\w-]{2,4}$/,
  seats: /^[1-9][0-9]{0,2}$/,
  ticketType: /^[1-9][0-9]{0,1}$/,
  boolean: /^[0-1]$/,
}; 

// --- VALID QUERIE PARAMETERS/VALUES ---

// - TABLE to query, using request parameters, :table
// GET /api/bookings/:table

// - FIELD from table to query by using query parameters key value pairs, ?key=value
// GET /api/bookings/:table?key=value

// - COMBINE multiple key/value-pairs for quering several fields
// GET /api/bookings/:table?key1=value1&key2=value2&key3>=value3

// - STRINGS - if whitespace use + like, "Lilla Salongen" should be "Lilla+Salongen"
// GET /api/bookings/:fullScreenings?theatreName=Lilla+Salongen

// - LOGICAL COMPARISON OPERATORS -  equal to( = ), greater than or equal ( >= ), lesser than or equal ( <= ), equal to ( = )
// GET /api/bookings/:table?key>=5

// GET /api/bookings    - DYNAMIC ROUTE, by using request parameter :table you can query from all tables not just bookings
const handleGetBookings = async (req: Request, res: Response) => {
  try {
    const { table } = req.params;
    const queryParams = req.query;
    const whereArgs: string[] = [];
    const queryParamsArr: (string | number)[] = [];
    let sql = `SELECT * FROM \`${table}\``;
    for (const [key, value] of Object.entries(queryParams)) {
      if (typeof key === "string" && value instanceof Array) {
        value.forEach((val) => {
            whereArgs.push(`FIND_IN_SET(?, REPLACE(\`${key}\`, " ", ""))`);
            queryParamsArr.push(val as string);
        });
      }

      if (typeof key === "string" && typeof value === "string") {   
        if (key === "limit" || key === "offset" || key === "sort") {
          continue;
        }
        if (key.endsWith(">") || key.endsWith("<") || key.endsWith("!")) {
          const [newKey, op] = key.split(/(!|<|>)/);
          if (op === ">") { whereArgs.push(`\`${newKey}\` >= ?`) }
          if (op === "<") { whereArgs.push(`\`${newKey}\` <= ?`) }
          if (op === "!") { whereArgs.push(`\`${newKey}\` <> ?`)}
          queryParamsArr.push(value);
        } else if (
          (table === "fullMovies" && key === "categories") ||
          (table === "fullScreenings" && key === "occupiedSeats") ||
          (table === "fullBookings" &&
            (key === "seats" || key === "ticketTypes"))
        ) {
          whereArgs.push(`FIND_IN_SET(?, REPLACE(\`${key}\`, " ", ""))`);
          queryParamsArr.push(value);
        } else {
          whereArgs.push(`\`${key}\` = ?`);
          queryParamsArr.push(value);
        }
      }
    }
    if (whereArgs.length > 0) {
      sql += " WHERE " + whereArgs.join(" AND ");
    }
    if (queryParams.sort) {
      const sortParams = queryParams.sort.toString().split(":");
      const sortColumn = sortParams[0];
      const sortOrder = sortParams[1]?.toUpperCase() === "DESC" ? "DESC" : "ASC";
      sql += ` ORDER BY \`${sortColumn}\` ${sortOrder}`;
    }
    if (queryParams.limit) {
      sql += ` LIMIT ?`;
      queryParamsArr.push(Number(queryParams.limit));
    }
    if (queryParams.offset) {
      sql += ` OFFSET ?`;
      queryParamsArr.push(Number(queryParams.offset));
    }
    const [rows] = await db.query(sql, queryParamsArr);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
}
type Seat = {
  seatId: number;
  ticketTypeId: number;
} 
// POST /api/bookings/:userId?  body{ email, screeningId, seats: [{seatId: number, ticketTypeId: number}]}
const createNewBooking = async (req: Request, res: Response) => {
  const userId = regExes.id.test(req.params.userId) ? +req.params.userId : null;
  const { email, screeningId, seats } = req.body;
  if (!regExes.email.test(email) || !regExes.id.test(screeningId.toString()) || !seats.every((seat: Seat) => (regExes.seats.test(seat.seatId.toString()) && regExes.ticketType.test(seat.ticketTypeId.toString())))) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const bookingNumber = await bookingsService.createNewBooking(userId, email, screeningId, seats);
  if (!bookingNumber) {
    return res.status(500).json({ error: "An error accured while booking" });
  }
  return res.status(201).json({ message: "Booking created ", bookingNumber });
}

// PUT /api/bookings/:bookingNumber/isPayed/:status     - :bookingNumber ( ABC123 ), status ( 0 or 1, 0 = false 1, = true)
const updatePaymentStatus = async (req: Request, res: Response) => {
  const { bookingNumber, status } = req.params;
  if (!regExes.bookingNumber.test(bookingNumber) || !regExes.boolean.test(status)) {
    return res.status(400).json({ error: "Request is missing required fields" });
  }
  const result = await bookingsService.updatePaymentStatus(bookingNumber, +status);
  if (!result) {
    return res.status(500).json({ error: "An error occured while updating record" });
  }
  return res.status(200).json({message: `Booking status updated for bookingNumber: ${bookingNumber}`})
}

// PUT /api/bookings/:bookingNumber/isActive/:status    - :bookingNumber ( ABC123 ), status ( 0 or 1, 0 = false, 1 = true)
const updateActiveStatus = async (req: Request, res: Response) => {
  const { bookingNumber, status } = req.params;
  if (!regExes.bookingNumber.test(bookingNumber) || !regExes.boolean.test(status)) {
    return res.status(400).json({ error: "Invalid request data" });
  }
  const result = await bookingsService.updateActiveStatus(bookingNumber, +status)
  if (!result) {
    return res.status(500).json({ error: "An error occured while updating record" });
  }
  return res.status(200).json({ message: "Booking active status successfully updated" });
}

// DELETE /api/bookings/:bookingNumber/:email
const deleteBooking = async (req: Request, res: Response) => {
  const { bookingNumber, email } = req.params;
  if (!regExes.bookingNumber.test(bookingNumber) || !regExes.email.test(email)) {
    return res.status(400).json({ error: "Ivalid request data" });
  }
  const result = await bookingsService.deleteBooking(bookingNumber, email);
  if (!result) {
    return res.status(500).json({ error: "Error deleting resource" });
  }
  return res.status(200).json({message: `Booking: ${bookingNumber} deleted`})
} 

export default { handleGetBookings, createNewBooking, deleteBooking, updatePaymentStatus, updateActiveStatus };