import { RegisterUser } from '../types/userTypes.js';
export declare const createUser: (userData: RegisterUser) => Promise<import("mysql2").QueryResult>;
export declare const findUserByEmail: (email: string) => Promise<any>;
