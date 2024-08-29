import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import {JWT} from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile } : { user: User; account: any; profile: any }) {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.email },
      });

      // If the user doesn't exist, create a new user
      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          },
        });
      }

      return true; // Allow sign-in
    },
    async session({ session, token } : { session: Session ; token: JWT }) {
      // Attach user ID to session
      if (session.user) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email || "" },
        });
        // session.user.id = user?.id || null; // Add user ID to session or set to null
      }
      return session;
    },
    async jwt({ token, user } : { token: JWT; user?: User }) {
      // Add user ID to the token if available
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/User', // Custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
