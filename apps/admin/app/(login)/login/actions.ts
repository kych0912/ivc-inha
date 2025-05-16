'use server';

import { z } from "zod";
import { redirect } from "next/navigation";
import { validatedAction } from "@/lib/auth/middleware";
import { signIn as signInNextAuth } from "@/auth";
import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/user-auth";


const signInSchema = z.object({
    email: z.string().email().min(3).max(255),
    password: z.string().min(8).max(100),
  });
  
export const signIn = validatedAction(signInSchema, async (data) => {
  try {
    const { email, password } = data;
    const result = await signInNextAuth("credentials", {
      email,
      password,
      redirect:false
    });

    if (!result) {
      return {
        status: 'error',
        message: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
      };
    }
  } catch (error) { 
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      // 리다이렉션은 정상적인 흐름으로 처리
      throw error;
    }
    console.log(error)
    return {
      error: 'error',
      message: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
    };
  }
  redirect('/dashboard')
});

async function createUser({
  email,
  password,
}:{
  email:string,
  password:string,
}) {

  const passwordHash =  await hashPassword(password);

  const newUser = {
      name:"admin",
      email,
      password:passwordHash,
    };
  const [createdUser] = await db.insert(users).values(newUser).returning();

  if (!createdUser) {
    return {
      ok:false,
      error:{
          error:'user_creation_failed',
          message:{
              email,
              password,
          }
      }
    };
  }
  
  return {
      ok:true,
      value:createdUser
  };
}

export async function signUpUserInterface({
  email,
  password,
}:{
  email: string,
  password: string, 
}){
  //유저 생성
  const createdUser = await createUser({
      email,
      password,
  });

  if (!createdUser.ok) {
      return {
          ok:false,
          error:createdUser.error
      }
  }

  return {
    ok:true,
    value:createdUser.value
  }
}

export const signUp = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  const userResult = await signUpUserInterface({
    email,
    password,
  });

  console.log(userResult)

  if(!userResult.ok){
    return userResult.error;
  }

  const user = userResult.value;


  console.log(user)
  redirect('/dashboard');
});