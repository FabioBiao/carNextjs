import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "../../../lib/controllers/usersController";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const { user, message } = await login({
          email: credentials.email,
          password: credentials.password,
        });
        console.log("next auth response");
        console.log(user);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          throw new Error(message);
        }
      },
    }),
  ],
  // adapter: PrismaAdapter(prisma),
  NEXTAUTH_URL: process.env.BASE_URL,
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: process.env.BASE_URL + "/auth/login",
    signOut: process.env.BASE_URL +  "/auth/signout",
    error: process.env.BASE_URL + "/auth/login", // Error code passed in query string as ?error=
    verifyRequest: process.env.BASE_URL + "/auth/verify-request", // (used for check email message)
  },
};
