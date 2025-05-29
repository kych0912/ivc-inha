'use server';

import { uploadFileAction, updateFormLink } from '@ivc-inha/api';
import { validatedAction } from '@/lib/auth/middleware';
import { z } from 'zod';

const uploadResumeSchema = z.object({
    base64File: z.string(),
    fileName: z.string(),
});

export const uploadResumeAction = validatedAction(uploadResumeSchema,
    async (data, formData) => {
        console.log(formData)
        try{
            await uploadFileAction(formData);
            return { success: '파일이 성공적으로 업로드되었습니다.' };
        } catch (error) {
            console.error('Upload error:', error);
            return { error: '파일 업로드 중 오류가 발생했습니다.' };
        }
    }
);

const updateFormLinkSchema = z.object({
    link: z.string(),
});

export const updateFormLinkAction = validatedAction(updateFormLinkSchema,
    async (data, formData) => {
        try{
            await updateFormLink(formData);
            return { success: '폼 링크가 성공적으로 업데이트되었습니다.' };
        } catch (error) {
            console.error('Update error:', error);
            return { error: '폼 링크 업데이트 중 오류가 발생했습니다.' };
        }
    }
);

