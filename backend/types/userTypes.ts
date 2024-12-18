// backend/types/userTypes.ts

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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role?: string;
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



