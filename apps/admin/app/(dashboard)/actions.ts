'use server';

import { uploadFileAction, updateFormLink, updatePublished } from '@ivc-inha/api';
import { validatedAction } from '@/lib/auth/middleware';
import { z } from 'zod';

const uploadResumeSchema = z.object({
  base64File: z.string(),
  fileName: z.string(),
});

export const uploadResumeAction = validatedAction(uploadResumeSchema, async (data, formData) => {
  try {
    await uploadFileAction(formData);
    return { success: '파일이 성공적으로 업로드되었습니다.' };
  } catch (error) {
    console.error('Upload error:', error);
    return { error: '파일 업로드 중 오류가 발생했습니다.' };
  }
});

const updateFormLinkSchema = z.object({
  link: z.string(),
});

export const updateFormLinkAction = validatedAction(
  updateFormLinkSchema,
  async (data, formData) => {
    try {
      await updateFormLink(formData);
      return { success: '폼 링크가 성공적으로 업데이트되었습니다.' };
    } catch (error) {
      console.error('Update error:', error);
      return { error: '폼 링크 업데이트 중 오류가 발생했습니다.' };
    }
  },
);

const updatePublishedSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const updatePublishedAction = validatedAction(
  updatePublishedSchema,
  async (data, formData) => {
    const from = new Date(formData.get('from') as string);
    const to = new Date(formData.get('to') as string);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      return { error: '유효하지 않은 날짜 형식입니다.' };
    }

    if (from > to) {
      return { error: '시작 날짜는 종료 날짜보다 이전이어야 합니다.' };
    }

    try {
      await updatePublished(from, to);
      return { success: '게시 기간이 성공적으로 업데이트되었습니다.' };
    } catch (error) {
      console.error('Update error:', error);
      return { error: '게시 기간 업데이트 중 오류가 발생했습니다.' };
    }
  },
);
