import {
  updateSelectedLinkAction,
  updateSelectedFileAction,
  deleteItemAction,
} from '@/app/(dashboard)/dashboard/db/actions';
import { formlink, files } from '@ivc-inha/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (link: { id: number; selected: boolean }) =>
      updateSelectedLinkAction(link.id, link.selected),
    onMutate: async (link) => {
      await queryClient.cancelQueries({ queryKey: ['links'] });
      const previousLinks = queryClient.getQueryData<(typeof formlink.$inferSelect)[]>(['links']);
      const newLinks = previousLinks?.map((l) =>
        l.id === link.id ? { ...l, selected: link.selected } : { ...l, selected: false },
      );
      queryClient.setQueryData(['links'], newLinks);
      return { previousLinks };
    },
    onError: (error, link, context) => {
      queryClient.setQueryData(['links'], context?.previousLinks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
};

export const useUpdateFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: { id: number; selected: boolean }) =>
      updateSelectedFileAction(file.id, file.selected),
    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: ['files'] });
      const previousFiles = queryClient.getQueryData<(typeof files.$inferSelect)[]>(['files']);
      const newFiles = previousFiles?.map((f) =>
        f.id === file.id ? { ...f, selected: file.selected } : { ...f, selected: false },
      );
      queryClient.setQueryData(['files'], newFiles);
      return { previousFiles };
    },
    onError: (error, file, context) => {
      queryClient.setQueryData(['files'], context?.previousFiles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (link: { id: number }) => deleteItemAction('link', link.id),
    onMutate: async (link) => {
      await queryClient.cancelQueries({ queryKey: ['links'] });
      const previousLinks = queryClient.getQueryData<(typeof formlink.$inferSelect)[]>(['links']);
      const newLinks = previousLinks?.filter((l) => l.id !== link.id);
      queryClient.setQueryData(['links'], newLinks);
      return { previousLinks };
    },
    onError: (error, link, context) => {
      queryClient.setQueryData(['links'], context?.previousLinks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
  });
};

export const useDeleteFileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: { id: number; path: string }) =>
      deleteItemAction('file', file.id, file.path),
    onMutate: async (file) => {
      await queryClient.cancelQueries({ queryKey: ['files'] });
      const previousFiles = queryClient.getQueryData<(typeof files.$inferSelect)[]>(['files']);
      const newFiles = previousFiles?.filter((f) => f.id !== file.id);
      queryClient.setQueryData(['files'], newFiles);
      return { previousFiles };
    },
    onError: (error, file, context) => {
      queryClient.setQueryData(['files'], context?.previousFiles);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['files'] });
    },
  });
};
