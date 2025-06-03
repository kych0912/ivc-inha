import { getFiles } from '@/app/(dashboard)/dashboard/db/actions';
import { useQuery } from '@tanstack/react-query';
import { getLinks } from '@/app/(dashboard)/dashboard/db/actions';

export const useLinkList = () => {
  return useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useFileList = () => {
  return useQuery({
    queryKey: ['files'],
    queryFn: getFiles,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
