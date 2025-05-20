'use server'
import { supabase } from '../lib/supabase';

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

        const { data, error } = await supabase
            .storage
            .from('resume')
            .upload(`files/${uniqueFileName}`, buffer, {
                contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            throw new Error('파일 업로드 중 오류가 발생했습니다.');
        }

        const { data: { publicUrl } } = supabase
            .storage
            .from('resume')
            .getPublicUrl(`files/${uniqueFileName}`);

        return {
            success: true,
            fileName: uniqueFileName,
            filePath: data.path,
            publicUrl
        };

    } catch (error) {
        console.error('Upload error:', error);
        throw new Error('파일 업로드 중 오류가 발생했습니다.');
    }
}