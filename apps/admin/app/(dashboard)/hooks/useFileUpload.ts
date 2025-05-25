import * as React from 'react';
import { ActionState } from '@/lib/auth/middleware';
import { useActionState } from 'react';
import { uploadResumeAction } from '../actions';

interface UseFileUploadReturn {
  file: string;
  name: string;
  formRef: React.RefObject<HTMLFormElement | null>;
  state: ActionState;
  formAction: (formData: FormData) => void;
  onDropFiles: (e: React.DragEvent<HTMLDivElement>) => Promise<void>;
  dragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onClickFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleReset: () => void;
}

export function useFileUpload(): UseFileUploadReturn {
  const [file, setFile] = React.useState<string>('');
  const [name, setName] = React.useState('');
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [state, formAction, _] = useActionState<ActionState, FormData>(
    uploadResumeAction,
    { error: '' },
  );

  const onDropFiles = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      await handleFileSelection(droppedFile);
    }
  };

  const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onClickFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      await handleFileSelection(selectedFile);
    }
  };

  const handleFileSelection = async (file: File) => {
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      alert('docx 파일만 가능합니다.');
      return;
    }

    setName(file.name);
    try {
      const base64 = await encodeFileToBase64(file);
      setFile(base64 as string);
    } catch (error) {
      console.error('파일 인코딩 에러:', error);
      alert('파일 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReset = () => {
    setFile('');
    setName('');
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const encodeFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);    
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return {
    file,
    name,
    formRef,
    state,
    formAction,
    onDropFiles,
    dragOver,
    onClickFileUpload,
    handleReset,
  };
} 