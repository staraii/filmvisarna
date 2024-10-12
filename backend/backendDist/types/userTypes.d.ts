export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}
export interface RegisterUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}
export interface LoginUser {
    email: string;
    password: string;
}
