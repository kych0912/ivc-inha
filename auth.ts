import NextAuth, { Account } from "next-auth"
import { db } from "@/lib/db/drizzle"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({ 
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
      Credentials({
        credentials: {
          name: { label: 'Name', type: 'text', optional: true },
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
            if(!credentials) throw new Error('No credentials provided');

            const user = await db
            .select({
                id: users.id,
                name: users.name,
                email: users.email,
            })
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .limit(1)
            .then(res => res[0]);
            
            if (!user) return null;

            return {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
            };
        }
      }),
    ],
    callbacks: {
      async signIn({ account }: { account: Account | null }) {
        if(!account) return false;
        
        return true;
      },
    async session({ session }) {
        return session;
      },
      authorized({ auth }) {
        return !!auth;
      },
    },
    session: {
      strategy: 'jwt',
    },  
    pages: {  
      signIn: '/sign-in',
    },
    secret: process.env.AUTH_SECRET,
  });