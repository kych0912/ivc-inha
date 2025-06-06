'use server';
import { supabase } from '../lib/supabase';
import { db } from '../db/drizzle';
import { files, formlink } from '../db/schema';

export async function uploadFileAction(formData: FormData) {
  try {
    const base64File = formData.get('base64File') as string;
    const fileName = formData.get('fileName') as string;

    if (!base64File || !fileName) {
      throw new Error('필수 파일 정보가 누락되었습니다.');
    }

    const base64Data = base64File.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    const timestamp = new Date().getTime();
    const uniqueFileName = `${timestamp}_${'resume'}`;

    const { data, error } = await supabase.storage
      .from('resume')
      .upload(`files/${uniqueFileName}`, buffer, {
        contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      throw new Error('파일 업로드 중 오류가 발생했습니다.');
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('resume').getPublicUrl(`files/${uniqueFileName}`);

    const result = await db
      .insert(files)
      .values({
        name: fileName,
        time: new Date(),
        fullPath: publicUrl,
        path: data.path,
      })
      .returning();

    if (!result) {
      throw new Error('파일 업로드 중 오류가 발생했습니다.');
    }

    return {
      success: true,
      fileName: uniqueFileName,
      filePath: data.path,
      publicUrl,
    };
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('파일 업로드 중 오류가 발생했습니다.');
  }
}

export async function deleteFileAction(path: string) {
  try {
    await supabase.storage.from('resume').remove([path]);
  } catch (error) {
    console.error('Delete file error:', error);
    throw new Error('파일 삭제 중 오류가 발생했습니다.');
  }
}

export async function updateFormLink(formData: FormData) {
  try {
    const link = formData.get('link');

    if (!link) {
      throw new Error('링크가 누락되었습니다.');
    }

    await db
      .insert(formlink)
      .values({
        link: link.toString(),
      })
      .returning();

    return {
      success: true,
      link: link.toString(),
    };
  } catch (error) {
    console.error('Update form link error:', error);
    throw new Error('폼 링크 업데이트 중 오류가 발생했습니다.');
  }
}
