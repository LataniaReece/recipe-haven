import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import supabase from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // Fetch the user from the database
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (!user || error) {
          throw new Error("Invalid email or password");
        }

        // Verify the password
        const isValid = await bcrypt.compare(password, user.hashed_password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          email: user.email,
          isNewUser: user.is_new_user || false,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.isNewUser = user.isNewUser || false;
      }

      if (account && account.provider === "google") {
        // Check if the user exists
        const { data: existingUser, error: existingUserError } = await supabase
          .from("users")
          .select("id, email, is_new_user")
          .eq("email", token.email)
          .single();

        if (existingUserError && existingUserError.code !== "PGRST116") {
          console.error(existingUserError);
          throw new Error("Error retrieving user from database.");
        }

        if (!existingUser) {
          // Create a new user
          const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert([
              {
                email: token.email,
                is_new_user: true,
              },
            ])
            .select("id, email, is_new_user")
            .single();

          if (insertError || !newUser) {
            throw new Error("Failed to create user in database.");
          }

          token.id = newUser.id;
          token.email = newUser.email;
          token.isNewUser = newUser.is_new_user;
        } else {
          token.id = existingUser.id;
          token.email = existingUser.email;
          token.isNewUser = existingUser.is_new_user || false;
        }
      }

      if (trigger === "update" && session) {
        return { ...token, ...session?.user };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        isNewUser: (token.isNewUser as boolean) || false,
      };

      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
