import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      authorize: async (credentials: any) => {
        const { email, password } = credentials;
        console.log(credentials, "---authorize");
        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user || !user.password) return null;

        if (!(await bcrypt.compare(password, user.password))) {
          return null;
        }
        console.log("1 user: ", user);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token }) => {
      console.log("2 token: ", token);
      return token;
    },
    session: async ({ session, token }) => {
      console.log("3 session: ");
      if (session.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
