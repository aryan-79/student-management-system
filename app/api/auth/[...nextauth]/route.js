import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "@/utils/db";
import User from "@/models/users";
import bcrypt from "bcrypt";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "text",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          await connectDb();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }
          const matching = await bcrypt.compare(
            credentials.password,
            user.hashedPassword,
          );
          if (!matching) return null;
          return user;
        } catch (error) {
          console.log("Failed to authorize!", error.message);
        }
      },
      pages: {
        signIn: "/login",
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ user, account, profile }) {
      // console.log("account: ", account);
      // console.log("profile: ", profile);
      if (account.provider === "credentials") {
        console.log("user : ", user);
        if (user) return true;
        return false;
      }
    },
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
