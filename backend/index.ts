import express from "express";
import mysql, { PoolOptions } from "mysql2/promise";


import moviesDetailsRouter from "./routes/moviesDetailsRouter.js";

// DB Config, loads values from .env
const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}
// Create connection pool / initializes database connection.
export const db = mysql.createPool(dbConfig);


// Server
const SERVER_PORT = process.env.SERVER_PORT || 5001;
export const app = express();

app.use(express.json());




app.use(moviesDetailsRouter);





app.listen(SERVER_PORT); 