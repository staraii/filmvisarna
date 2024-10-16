// backend/@types/express-session.d.ts

import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: number; // Or whatever type your userId is
    userRole: string; // Add the userRole property
  }
}