// Main entry point for Express application.
// Set up server, Connects to Mysql database.


import express from "express";
import mysql, { PoolOptions } from "mysql2/promise";
import authRouter from "./routes/authRouter.js";
import session from "express-session";
import ticketRouter from "./routes/ticketRouter.js";

// DB Config, loads values from .env
const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

// Create a MySQL connection pool
export const db = mysql.createPool(dbConfig);


// Server, Set up Express application
const SERVER_PORT = process.env.SERVER_PORT || 5002;
export const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Session middleware setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Use true if using HTTPS
}));

// Routers
app.use(authRouter);
app.use(ticketRouter);


// Test route to see if server and db connection works as expected
 app.get("/api/names", async (_req, res) => {
   const result = await db.query("SELECT * FROM bookings WHERE userid = 1;");
   res.json({ success: result[0]})
 })

 // Start the server
app.listen(SERVER_PORT); 



