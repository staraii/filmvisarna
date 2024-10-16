import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number; // or string, depending on your user ID type
    userRole?: string; // Optional if you're storing roles
  }
}