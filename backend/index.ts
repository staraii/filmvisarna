// Main entry point for the Express application.
// Sets up the server and connects to the MySQL database.

import express from "express";
import mysql, { PoolOptions } from "mysql2/promise";
import bookingsRouter from "./routes/bookingsRouter.js";
//import moviesRouter from "./routes/moviesRouter.js";
import moviesDetailsRouter from "./routes/moviesDetailsRouter.js";
import authRouter from "./routes/authRouter.js";
import session from "express-session";
import MySQLStore from "express-mysql-session"; // Import MySQL session store
import screeningRouter from "./routes/screeningsRouter.js";


// DB Config, loads values from .env
const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Create a MySQL connection pool
export const db = mysql.createPool(dbConfig);

// Create MySQL session store
const MySQLSessionStore = MySQLStore(session as any); // Link the MySQLStore with express-session
const sessionStore = new MySQLSessionStore(dbConfig); // Initialize session store with DB config

// Server, Set up Express application
const SERVER_PORT = process.env.SERVER_PORT || 5002;
export const app = express();

// Middleware to parse JSON requests
app.use(express.json());



app.use(moviesDetailsRouter);


// Session middleware with MySQL store
app.use(
  session({
    name: "session_cookie_name", // Name of the session cookie
    secret: process.env.SESSION_SECRET || "your_secret_key", // Secret for session encryption
    store: sessionStore, // Use MySQL session store
    resave: false, // Do not save session if unmodified
    saveUninitialized: false, // Do not create session until something is stored
    cookie: {
      secure: false, // Set true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Set session expiration time (24 hours)
    },
  })
);


// Routers
app.use(authRouter); // Authentication routes
app.use("/api", screeningRouter);
app.use("/api/bookings", bookingsRouter);
// app.use(moviesRouter);

// Test route to verify server and DB connection
app.get("/api/names", async (_req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM bookings WHERE userid = 1;"); // Query to fetch bookings for user ID 1
    res.json({ success: results }); // Return the results in JSON format
  } catch (error) {
    console.error('Error fetching names:', error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Return error response
  }
});

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`); // Log server start
});