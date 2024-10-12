// backend/@types/express-session.d.ts

import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: number; // Add your custom session properties here
  }
}
