import { NextAuthOptions, Profile as BaseProfile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@/models/user";
import { connectToDB } from "./database";

interface GoogleProfile extends BaseProfile {
  name: string;
  picture: string;
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      });
      if (sessionUser) {
        (session.user as { [key: string]: unknown }).id =
          sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const googleProfile = profile as GoogleProfile;

        const userExists = await User.findOne({
          email: googleProfile.email,
        });

        if (!userExists) {
          await User.create({
            email: googleProfile.email,
            username: googleProfile.name.replace(" ", "").toLowerCase(),
            image: googleProfile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
};
