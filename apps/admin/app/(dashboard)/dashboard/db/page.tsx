'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { AlertCircle } from 'lucide-react';
import { LinkItem, ListItem } from './ListItem';
import { useLinkList, useFileList } from '@/hooks/queries';

const RenderConomponent = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  return children;
};

export default function DB() {
  const { data: linkList = [], isLoading: isLinkLoading } = useLinkList();
  const { data: fileList = [], isLoading: isFileLoading } = useFileList();
  return (
    <div>
      <div className="p-4">
        <Card className="bg-card">
          <CardHeader className="pb-0">
            <CardTitle>제목</CardTitle>
          </CardHeader>
          <CardContent>
            <RenderConomponent isLoading={isLinkLoading}>
              {linkList.length > 0 ? (
                <ul className="space-y-4">
                  {linkList.map((link) => {
                    return <LinkItem key={link.id} link={link} />;
                  })}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {'링크가 없습니다.'}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    {'첨부파일을 추가해주세요.'}
                  </p>
                </div>
              )}
            </RenderConomponent>
          </CardContent>
        </Card>
      </div>

      <div className="p-4">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>첨부파일</CardTitle>
          </CardHeader>
          <CardContent>
            <RenderConomponent isLoading={isFileLoading}>
              {fileList.length > 0 ? (
                <ul className="space-y-4">
                  {fileList.map((file) => {
                    return <ListItem key={file.id} file={file} />;
                  })}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <AlertCircle className="h-12 w-12 text-orange-500 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {'첨부파일이 없습니다.'}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    {'첨부파일을 추가해주세요.'}
                  </p>
                </div>
              )}
            </RenderConomponent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
