/* eslint-disable @typescript-eslint/no-unused-vars */
import "server-only";
import NextAuth from "next-auth";
import type { Session, Account, Profile, User as AuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/connectDB";
import User from "@/models/user.model";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
interface GoogleProfile {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }: { session: Session }) {
      console.log("session", session);
      await connectDB();
      const sessionUser = await User.findOne(
        { email: session.user?.email },
        "_id"
      );
      if (!sessionUser) return session;
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({
      user,
      account,
      profile,
    }: {
      user: AuthUser;
      account: Account | null;
      profile?: Profile;
    }) {
      const googleProfile = profile as GoogleProfile;
      console.log("profile", profile);
      await connectDB();
      try {
        const userExists = await User.findOne({ email: googleProfile?.email });

        if (!userExists) {
          await User.create({
            email: googleProfile?.email,
            username: googleProfile?.name?.toLowerCase().replace(/\s+/g, ""),
            image: googleProfile?.picture,
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
