var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from '../index.js'; // Import the db pool from your index.ts
export const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, phone, role } = userData;
    try {
        const [result] = yield db.query('INSERT INTO users (firstName, lastName, email, password, phone, role) VALUES (?, ?, ?, ?, ?, ?)', [firstname, lastname, email, password, phone, role]);
        return result; // Return the result of the insertion
    }
    catch (error) {
        console.error('Error inserting user:', error);
        throw error; // Propagate the error to the caller
    }
});
export const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0]; // Return the first user found or undefined if not found
    }
    catch (error) {
        console.error('Error finding user by email:', error);
        throw error; // Propagate the error to the caller
    }
});
//# sourceMappingURL=userService.js.map