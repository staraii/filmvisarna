// Main entry point for the Express application.
// Sets up the server and connects to the MySQL database.

import express from "express";
import mysql, { PoolOptions } from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";

import screeningsRouter from "./routes/screeningsRouter.js";
import bookingsRouter from "./routes/bookingsRouter.js";
import moviesRouter from "./routes/moviesRouter.js";
import liveChairRouter from "./routes/liveChairRouter.js";
import moviesDetailsRouter from "./routes/moviesDetailsRouter.js";
import authRouter from "./routes/authRouter.js";
import session from "express-session";
import MySQLStore from "express-mysql-session"; // Import MySQL session store

// Getting directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Getting path to images directory
const IMAGES_FOLDER = path.join(__dirname, "../assets/images/");
// Serving static files from /images
const imageServer = express();
imageServer.use(express.static(IMAGES_FOLDER));

// DB Config, loads values from .env
const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Server
const SERVER_PORT = process.env.SERVER_PORT || 5001;

// Create a MySQL connection pool
export const db = mysql.createPool(dbConfig);

// Create MySQL session store
const MySQLSessionStore = MySQLStore(session as any); // Link the MySQLStore with express-session
const sessionStore = new MySQLSessionStore(dbConfig); // Initialize session store with DB config

export const app = express();

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
      maxAge: 1000 * 60 * 60 * 24, // Set session expiration time to 24 hours (in milliseconds)
    },
  })
);

// Middleware to parse JSON requests
app.use(express.json());

app.use("/images", imageServer);

// Routers
app.use("/api/screenings", screeningsRouter);
app.use("/api/bookings", bookingsRouter);
app.use(moviesRouter);
app.use(authRouter);
app.use("/api/moviesDetails", moviesDetailsRouter);
app.use("/api/events", liveChairRouter);

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`); // Log server start
});

//Frontend directory prefix
const FRONTEND_PREFIX = process.env.FRONTEND_PREFIX || "../frontend/dist";
//Getting path to frontend dist folder
const FRONTEND_DIST = path.join(__dirname, FRONTEND_PREFIX);
//Serving static files from frontend dist folder
app.use(express.static(FRONTEND_DIST));
//If no route path matches serve frontend entry file
app.get("*", (_req, res) => {
 res.sendFile(path.join(FRONTEND_DIST, "index.html"));
})
