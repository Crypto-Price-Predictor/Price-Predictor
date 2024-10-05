// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;  // Add the `id` field
      name?: string;
      email?: string;
      image?: string;
    };
  }
  
  interface User {
    id: string;  // Also, add this to the `User` type if needed
  }
}
