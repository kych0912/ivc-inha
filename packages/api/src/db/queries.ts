import { eq, ne, desc } from 'drizzle-orm';
import { db } from './drizzle';
import { files, users, formlink } from './schema';

type UpdateType = 'file' | 'link';

export async function getUser(email: string) {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getFileList() {
  const fileList = await db.select().from(files).orderBy(desc(files.id));
  return fileList;
}

export async function getLinkList() {
  const linkList = await db.select().from(formlink).orderBy(desc(formlink.id));
  return linkList;
}

export async function updateSelected(type: UpdateType, id: number, selected: boolean) {
  switch (type) {
    case 'file':
      await db.update(files).set({ selected }).where(eq(files.id, id));
      break;
    case 'link':
      await db.update(formlink).set({ selected }).where(eq(formlink.id, id));
      break;
  }
}

export const updateUnSelectedAll = async (type: UpdateType, excludeId: number) => {
  switch (type) {
    case 'file':
      await db.update(files).set({ selected: false }).where(ne(files.id, excludeId));
      break;
    case 'link':
      await db.update(formlink).set({ selected: false }).where(ne(formlink.id, excludeId));
      break;
  }
};

export const deleteItem = async (type: UpdateType, id: number) => {
  switch (type) {
    case 'file':
      await db.delete(files).where(eq(files.id, id));
      break;
    case 'link':
      await db.delete(formlink).where(eq(formlink.id, id));
      break;
  }
};
