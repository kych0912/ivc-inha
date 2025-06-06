'use server';
import { getFormLink, getFiles } from '@ivc-inha/api';

export async function getFormLinkAction() {
  const formLink = await getFormLink();
  return formLink;
}

export async function getFilesAction() {
  const { data, name } = await getFiles();
  if (!data) {
    throw new Error('파일을 찾을 수 없습니다.');
  }
  return {
    data: data,
    name: name,
  };
}
