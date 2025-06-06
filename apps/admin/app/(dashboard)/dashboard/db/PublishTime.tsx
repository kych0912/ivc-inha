import { Calendar, Clock } from 'lucide-react';

export default function PublishTime({ published }: { published: { from: Date; to: Date }[] }) {
  return published.length > 0 ? (
    <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-900">
          {published[0].from.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          ~{' '}
          {published[0].to.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-700" />
          <span className="text-xs text-gray-800">
            시작까지{' '}
            {Math.max(
              0,
              Math.ceil(
                (published[0].from.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
              ),
            )}
            일
          </span>
        </div>
        <div className="h-4 w-px bg-gray-300"></div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-700" />
          <span className="text-xs text-gray-800">
            종료까지{' '}
            {Math.max(
              0,
              Math.ceil((published[0].to.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
            )}
            일
          </span>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-sm text-gray-500">게시 기간이 설정되지 않았습니다.</p>
  );
}
