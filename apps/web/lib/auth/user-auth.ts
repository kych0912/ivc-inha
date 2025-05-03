import { compare, hash } from "bcryptjs";
import { users } from "@/lib/db/schema";
import { db } from "../db/drizzle";
import { eq } from "drizzle-orm";


const SALT_ROUNDS = 10;

export interface AuthError{
    error: string;
    message:Record<string,any>
};

export type Result<T, E = AuthError> = 
  | { ok: true; value: T }
  | { ok: false; error: E };

export async function comparePasswords(password:string, hashedPassword:string) {
    return await compare(password, hashedPassword);
}

export async function hashPassword(password:string){
    return await hash(password, SALT_ROUNDS);
}

export async function signInUser(email:string,password:string){
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

    if(!user) return {
        ok:false, 
        error:{
            error:"User not found", 
            message:{
                message:"User not found"
            }
        }
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if(!isPasswordValid) return {
        ok:false,
        error:{
            error:"Invalid password",
            message:{
                message:"Invalid password"
            }
        }
    }

    return {
        ok:true,
        value:user
    }
}

export async function signUpUser(email:string,password:string){
    const hashedPassword = await hashPassword(password);


}