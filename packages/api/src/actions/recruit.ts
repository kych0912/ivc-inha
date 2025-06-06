'use server';
import { db } from '../db/drizzle';
import { formlink, published, files } from '../db/schema';
import { desc, eq } from 'drizzle-orm';
import { supabase } from '../lib/supabase';

const checkPublished = async () => {
  let publishedData;
  try {
    publishedData = await db.select().from(published).orderBy(desc(published.createdAt)).limit(1);
  } catch (err) {
    console.error(err);
    throw new Error('오류가 발생했습니다.');
  }
  const now = new Date();

  if (publishedData.length === 0) {
    throw new Error('모집 기간이 설정되지 않았습니다.');
  }
  if (publishedData[0].from > now || publishedData[0].to < now) {
    throw new Error('모집 기간이 아닙니다.');
  }
};

// published 확인
// 아닐 경우 error return
// 맞을 경우 formlink 확인
export async function getFormLink() {
  try {
    await checkPublished();

    const formLinkData = await db.select().from(formlink).where(eq(formlink.selected, true));

    if (formLinkData.length === 0) {
      throw new Error('링크가 설정되지 않았습니다.');
    }

    return formLinkData[0].link;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('오류가 발생했습니다.');
  }
}

export async function getFiles() {
  try {
    await checkPublished();

    const filesData = await db.select().from(files).where(eq(files.selected, true));

    if (filesData.length === 0) {
      throw new Error('첨부파일이 설정되지 않았습니다.');
    }
    const file = await supabase.storage.from('resume').download(filesData[0].path);
    return {
      data: file.data,
      name: filesData[0].name,
    };
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('오류가 발생했습니다.');
  }
}
