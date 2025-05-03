import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { users } from "./schema";
import { auth } from "@/auth";


export async function getUser() {
    const session = await auth();
  
    if (!session || !session.user?.email) {
      return null;
    }
  
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);
  
    if (user.length === 0) {
      return null;
    }
    
    return user[0];
  }
