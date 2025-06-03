'use server';
import {
  updateSelected,
  getLinkList,
  getFileList,
  updateUnSelectedAll,
  deleteItem,
  deleteFileAction,
} from '@ivc-inha/api';

export async function updateSelectedFileAction(id: number, selected: boolean) {
  try {
    await updateSelected('file', id, selected);
    await updateUnSelectedAll('file', id);
  } catch (error) {
    console.error(error);
  }
}

export async function updateSelectedLinkAction(id: number, selected: boolean) {
  try {
    await updateSelected('link', id, selected);
    await updateUnSelectedAll('link', id);
  } catch (error) {
    console.error(error);
  }
}

export async function getLinks() {
  try {
    const linkList = await getLinkList();
    return linkList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getFiles() {
  try {
    const fileList = await getFileList();
    return fileList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteItemAction(type: 'link' | 'file', id: number, path?: string) {
  try {
    await deleteItem(type, id);
    if (type === 'file' && path) deleteFileAction(path);
  } catch (error) {
    console.error(error);
  }
}
