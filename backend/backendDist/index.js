var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import mysql from "mysql2/promise";
import authRouter from "./routes/authRouter.js";
import session from "express-session";
// DB Config, loads values from .env
const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
// Create connection pool / initializes database connection.
export const db = mysql.createPool(dbConfig);
// Server
const SERVER_PORT = process.env.SERVER_PORT || 5002;
export const app = express();
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Use true if using HTTPS
}));
// Routers
app.use(authRouter);
// Test route to see if server and db connection works as expected
app.get("/api/names", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db.query("SELECT * FROM bookings WHERE userid = 1;");
    res.json({ success: result[0] });
}));
app.listen(SERVER_PORT);
//# sourceMappingURL=index.js.map