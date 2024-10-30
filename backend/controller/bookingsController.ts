import { Request, Response } from "express";
import bookingsService from "../services/bookingsService.js";
import MailService from "../services/mailService.js";
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

// - LIMIT - limit number of records in response
// GET /api/bookings/:table?limit=5

// - OFFSET - pagination, set an offset value for records to retrieve
// GET /api/bookings/:table?offset=10

// - SORT - select column/field to sort results by, ascending or descending order.
// GET /api/bookings/:table?sort=bookingDate:desc

// GET /api/bookings    - DYNAMIC ROUTE, by using request parameter :table you can query from all tables not just bookings
const handleGetBookings = async (req: Request, res: Response) => {
  try {
    const { table } = req.params;
    const queryParams = req.query;
    const whereArgs: string[] = [];
    const queryParamsArr: (string)[] = [];
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
      queryParamsArr.push(queryParams.limit.toString());
    }
    if (queryParams.offset) {
      sql += ` OFFSET ?`;
      queryParamsArr.push(queryParams.offset.toString());
    }
    const [rows] = await db.execute(sql, queryParamsArr);
    if (rows instanceof Array && rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    return res.status(200).json(rows);
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
  //const userId = regExes.id.test(req.params.userId) ? +req.params.userId : null;
  const userId = (typeof req.query.userId === "string" && regExes.id.test(req.query.userId)) ? +req.query.userId : null;
  const { email, screeningId, seats } = req.body;
  if (!regExes.email.test(email) || !regExes.id.test(screeningId.toString()) || !seats.every((seat: Seat) => regExes.seats.test(seat.seatId.toString()) && regExes.ticketType.test(seat.ticketTypeId.toString()))) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const result = await bookingsService.createNewBooking(userId, email, screeningId, seats);
  if (!result) {
    return res.status(500).json({ error: "An error accured while booking" });
  }
  const booking = await bookingsService.getBookingValidation(result.bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking confirmation not found" });
  }
  //Send email
  const mailService = new MailService();
  await mailService.sendMail(result.bookingNumber);
  return res.status(201).json(booking);
}


// Update bookings isActive status
// PUT /api/bookings/bookings?bookingNumber=GGJ432&isActive=0
// Update bookings isPayed status
// PUT /api/bookings/bookings?bookingNumber=GGJ432&isPayed=1
const updateBooking = async (req: Request, res: Response) => {
  const bookingNumber = (typeof req.query.bookingNumber === "string" && regExes.bookingNumber.test(req.query.bookingNumber)) ? req.query.bookingNumber : undefined;
  const isPayed = (typeof req.query.isPayed === "string" && regExes.boolean.test(req.query.isPayed)) ? req.query.isPayed : undefined;
  const isActive = (typeof req.query.isActive === "string" && regExes.boolean.test(req.query.isActive)) ? req.query.isActive : undefined;
  if (bookingNumber && (isPayed || isActive)) {
    const result = await bookingsService.updateBookingStatus(bookingNumber, isPayed!, isActive!);
    if (!result) {
      return res.status(500).json({ error: "An error occured while updating record" });
    }
    return res.status(200).json({ message: `Booking: ${bookingNumber}, updated status ${isPayed ? "isPayed: " : "isActive: "} ${isPayed ? isPayed === "1" ? "true" : "false" : isActive === "0" ? "false" : "true"}` });
  }
}

// DELETE /api/bookings/:bookings?bookingNumber=ADR304    /admin, staff
// DELETE /api/bookings/:bookings?bookingNumber=ADR304&userId=4     /user
// DELETE /api/bookings/:bookings?bookingNumber=ADR304&email=adress@email.se    /visitor
const deleteBooking = async (req: Request, res: Response) => {
  const bookingNumber = (typeof req.query.bookingNumber === "string" && regExes.bookingNumber.test(req.query.bookingNumber)) ? req.query.bookingNumber : undefined;
  const email = (typeof req.query.email === "string" && regExes.email.test(req.query.email)) ? req.query.email : undefined;
  const userId = (typeof req.query.userId === "string" && regExes.id.test(req.query.userId)) ? req.query.userId : undefined;

  if (!bookingNumber) {
    return res.status(400).json({ message: "Invalid request parameters" });
  }
  const result = await bookingsService.deleteBooking(bookingNumber, email!, userId!);
  if (!result) {
    return res.status(500).json({ message: "Error deleting resource" });
  }
  return res.status(200).json({message: `Booking: ${bookingNumber} successfully deleted`})
} 

export default { handleGetBookings, createNewBooking, deleteBooking, updateBooking };