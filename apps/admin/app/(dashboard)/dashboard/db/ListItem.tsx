'use client';

import { Switch, Button } from '@/components/ui';
import { files, formlink } from '@ivc-inha/api';
import {
  useUpdateFileMutation,
  useUpdateLinkMutation,
  useDeleteFileMutation,
  useDeleteLinkMutation,
} from '@/hooks/mutations';
import { Trash } from 'lucide-react';

const formattedDate = (date: Date) => {
  return new Date(date)
    .toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\./g, '')
    .replace(',', '')
    .replace('시', '시 ')
    .replace('분', '분');
};

export const ListItem = ({ file }: { file: typeof files.$inferSelect }) => {
  const { mutate } = useUpdateFileMutation();
  const { mutate: deleteFile } = useDeleteFileMutation();

  return (
    <li key={file.id} className="flex items-center space-x-4">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formattedDate(file.uploadedAt)}</p>
      </div>
      <Switch
        checked={file.selected}
        onCheckedChange={() =>
          mutate({
            id: file.id,
            selected: !file.selected,
          })
        }
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteFile({ id: file.id, path: file.path })}
      >
        <Trash size={16} />
      </Button>
    </li>
  );
};

export const LinkItem = ({ link }: { link: typeof formlink.$inferSelect }) => {
  const { mutate } = useUpdateLinkMutation();
  const { mutate: deleteLink } = useDeleteLinkMutation();

  const validLink = link.link.startsWith('http') ? link.link : `https://${link.link}`;

  return (
    <li key={link.id} className="flex items-center space-x-4">
      <a href={validLink} target="_blank" className="flex-1">
        <p className="text-sm font-medium text-foreground">{validLink}</p>
        <p className="text-xs text-muted-foreground">{formattedDate(link.createdAt)}</p>
      </a>
      <Switch
        checked={link.selected}
        onCheckedChange={() =>
          mutate({
            id: link.id,
            selected: !link.selected,
          })
        }
      />
      <Button variant="ghost" size="icon" onClick={() => deleteLink({ id: link.id })}>
        <Trash size={16} />
      </Button>
    </li>
  );
};
