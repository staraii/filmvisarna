import express from "express";
import mysql, { PoolOptions } from "mysql2/promise";
//import screeningsRouter from "./routes/screeningsRouter.js"
import bookingsRouter from "./routes/bookingsRouter.js";
//import moviesRouter from "./routes/moviesRouter.js";
//import authRouter from "./routes/authRouter.js";

import moviesDetailsRouter from "./routes/moviesDetailsRouter.js";

// DB Config, loads values from .env
const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
// Create connection pool / initializes database connection.
export const db = mysql.createPool(dbConfig);

// Server
const SERVER_PORT = process.env.SERVER_PORT || 5001;
export const app = express();

app.use(express.json());

// Routers
// app.use(screeningsRouter);
app.use("/api/bookings", bookingsRouter);
// app.use(moviesRouter);
// app.use(authRouter);

app.use(moviesDetailsRouter);

// Test route to see if server and db connection works as expected
// app.get("/api/names", async (_req, res) => {
//   const result = await db.query("SELECT * FROM movies WHERE moviesCategories = 'Action';");
//   res.json({ success: result[0]})
// })

app.listen(SERVER_PORT);
