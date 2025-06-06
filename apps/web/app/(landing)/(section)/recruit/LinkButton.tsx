'use client';

import { getFormLinkAction, getFilesAction } from './actions';
import { useState } from 'react';

function Spinner() {
  return (
    <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
  );
}

export function LinkButton({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      const result = await getFilesAction();
      if (result.error) throw new Error(result.error);

      const { data, name } = result;
      if (!data || !name) throw new Error('파일을 찾을 수 없습니다.');
      const url = URL.createObjectURL(data);

      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // URL 객체 해제
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : '파일 다운로드 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async () => {
    try {
      const formLinkResult = await getFormLinkAction();
      if (typeof formLinkResult === 'string') {
        window.open(formLinkResult, '_blank');
      } else if (formLinkResult.error) {
        throw new Error(formLinkResult.error);
      } else {
        throw new Error('오류가 발생했습니다.');
      }
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : '지원서 제출 링크를 가져오는 중 오류가 발생했습니다.',
      );
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      switch (children) {
        case '지원서 다운로드':
          await handleDownload();
          break;
        case '지원서 제출':
          await handleSubmit();
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="border border-white text-white py-1 px-2 md:py-4 md:px-6 rounded-lg"
    >
      <p className="text-white text-xl md:text-3xl font-suit font-bold w-[130px] md:w-[200px]">
        {isLoading ? <Spinner /> : children}
      </p>
    </button>
  );
}
