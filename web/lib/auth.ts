import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compareSync, hashSync } from "bcryptjs";

type DemoUser = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  passwordHash: string;
};

const demoUsers: DemoUser[] = [
  {
    id: "u_helper_1",
    email: "helper@getthatjob.dev",
    name: "Blue Fox",
    role: "user",
    passwordHash: hashSync("demo1234", 10),
  },
  {
    id: "u_admin_1",
    email: "admin@getthatjob.dev",
    name: "Admin",
    role: "admin",
    passwordHash: hashSync("admin1234", 10),
  },
];

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) return null;
      const user = demoUsers.find((candidate) => candidate.email === credentials.email);
      if (!user) return null;
      if (!compareSync(String(credentials.password), user.passwordHash)) return null;

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? "user";
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.role = (token.role as string) ?? "user";
      return session;
    },
  },
};
