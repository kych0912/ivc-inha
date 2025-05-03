'use server';

import { z } from "zod";
import { redirect } from "next/navigation";
import { validatedAction } from "@/lib/auth/middleware";
import { signIn as signInNextAuth } from "@/auth";

const signInSchema = z.object({
    email: z.string().email().min(3).max(255),
    password: z.string().min(8).max(100),
  });
  
  export const signIn = validatedAction(signInSchema, async (data) => {
    const { email, password } = data;
    
    

    
    await signInNextAuth("credentials",data);

    redirect('/dashboard');
  });
  