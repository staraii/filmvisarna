// backend/types/userTypes.ts

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string; // Password should be hashed in practice
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

export interface TicketType {
  id: number;
  type: string;
  price: number;
}



