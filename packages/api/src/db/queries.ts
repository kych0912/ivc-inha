import { eq, ne, desc } from 'drizzle-orm';
import { db } from './drizzle';
import { files, users, formlink, published } from './schema';
import type { InferSelectModel } from 'drizzle-orm';

type UpdateType = 'file' | 'link';
type FileType = InferSelectModel<typeof files>;
type LinkType = InferSelectModel<typeof formlink>;

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

export async function getPublishedDate() {
  const publishedDate = await db
    .select()
    .from(published)
    .orderBy(desc(published.createdAt))
    .limit(1);
  return publishedDate;
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

export async function getSelectedItem(type: 'file'): Promise<FileType[]>;
export async function getSelectedItem(type: 'link'): Promise<LinkType[]>;
export async function getSelectedItem(type: UpdateType): Promise<FileType[] | LinkType[]> {
  switch (type) {
    case 'file':
      return await db.select().from(files).where(eq(files.selected, true));
    case 'link':
      return await db.select().from(formlink).where(eq(formlink.selected, true));
  }
}

export async function updatePublished(from: Date | null, to: Date | null) {
  if (from && to) {
    await db.insert(published).values({ from, to });
  } else {
    throw new Error('모집 기간이 설정되지 않았습니다.');
  }
}
