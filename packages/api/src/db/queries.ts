import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { users } from "./schema";


export async function getUser(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) {
    return null;
  }
    
  return user[0];
}
