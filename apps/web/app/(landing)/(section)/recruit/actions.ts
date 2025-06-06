'use server';
import { getFormLink, getFiles } from '@ivc-inha/api';

export async function getFormLinkAction() {
  try {
    const formLink = await getFormLink();
    return formLink;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: '오류가 발생했습니다.' };
  }
}

export async function getFilesAction() {
  try {
    const { data, name } = await getFiles();
    if (!data || !name) {
      return { error: '파일을 찾을 수 없습니다.' };
    }
    return {
      data: data,
      name: name,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: '오류가 발생했습니다.' };
  }
}
