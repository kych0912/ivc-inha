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
  const handleClick = async () => {
    try {
      setIsLoading(true);
      switch (children) {
        case '지원서 다운로드':
          const { data, name } = await getFilesAction();
          console.log(name);
          const url = URL.createObjectURL(data);
          const a = document.createElement('a');
          a.href = url;
          a.download = name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          break;
        case '지원서 제출':
          const formLink = await getFormLinkAction();
          window.open(formLink, '_blank');
          break;
        default:
          break;
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        console.error('Error:', error.message);
        alert(error.message);
      } else {
        console.error('Error:', error);
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
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
