import NextAuth, { Account } from "next-auth"
import { db } from "@/lib/db/drizzle"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

// 자격 증명을 위한 타입 정의
interface ICredentials {
  email: string;
  password: string;
  name?: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({ 
    providers: [
      Credentials({
        credentials: {
          name: { label: 'Name', type: 'text', optional: true },
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials): Promise<any> {
          if (!credentials) {
              throw new Error('인증 정보가 제공되지 않았습니다');
          }

          const { email, password } = credentials as ICredentials;

          if (!email || !password) {
              throw new Error('이메일과 비밀번호를 모두 입력해주세요');
          }
          
          const user = await db
              .select({
                  id: users.id,
                  name: users.name,
                  email: users.email,
                  password: users.password,
              })
              .from(users)
              .where(eq(users.email, email))
              .limit(1)
              .then(res => res[0]);

          if (!user) {
            throw new Error("유효하지 않은 이메일입니다.")
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);
          
          if (!isPasswordValid) {
              throw new Error('비밀번호가 일치하지 않습니다');
          }

          return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
          };
        }
      }),
    ],
    callbacks: {
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