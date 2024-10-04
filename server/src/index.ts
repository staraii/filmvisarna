import express from "express";
import mysql, {PoolOptions} from "mysql2/promise";

// DB Config, loads values from .env
const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}
// Create connection pool / initializes database connection.
const db = mysql.createPool(dbConfig);


// Server
const SERVER_PORT = process.env.SERVER_PORT || 5001;
export const app = express();

// Test route to see if server and db connection works as expected
app.get("/api/names", async (_req, res) => {
  const result = await db.query("SELECT Name FROM Users");
  res.json({ success: result[0]})
})

app.listen(SERVER_PORT);