'use client';
import { addDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { updatePublishedAction } from '../actions';
import { DatePickerWithRange } from '@/components/RangeDatePicker';
import { useActionState } from 'react';
import { ActionState } from '@/lib/auth/middleware';
import { SubmitButton } from './page';
import { useQueryClient } from '@tanstack/react-query';
import { RenderConomponent } from './db/page';
import PublishTime from './db/PublishTime';
export default function DateCard({
  published,
  isPublishedLoading,
}: {
  published: { from: Date; to: Date }[] | [];
  isPublishedLoading: boolean;
}) {
  const queryClient = useQueryClient();
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [publishedState, publishedAction] = useActionState<ActionState, FormData>(
    updatePublishedAction,
    {
      error: '',
    },
  );

  useEffect(() => {
    setDate({
      from: new Date(published?.[0]?.from || Date.now()),
      to: new Date(published?.[0]?.to || addDays(new Date(Date.now()), 20)),
    });
  }, [published]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['published'] });
  }, [publishedState.success]);

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle>모집 기간</CardTitle>
      </CardHeader>
      <CardContent>
        <RenderConomponent isLoading={isPublishedLoading}>
          <PublishTime published={published} />
          <form className="mt-4" action={publishedAction}>
            <input
              className="hidden"
              type="date"
              name="from"
              value={date?.from?.toLocaleDateString('en-CA') || ''}
              onChange={(e) => {
                setDate({
                  ...date,
                  from: new Date(e.target.value),
                });
              }}
            />
            <input
              className="hidden"
              type="date"
              name="to"
              value={date?.to?.toLocaleDateString('en-CA') || ''}
              onChange={(e) => {
                setDate({
                  from: date?.from || new Date(),
                  to: new Date(e.target.value),
                });
              }}
            />
            <DatePickerWithRange date={date} setDate={setDate} />
            <SubmitButton>모집 기간 업데이트</SubmitButton>

            {publishedState.error && <p className="mt-2 text-red-500">{publishedState.error}</p>}

            {publishedState.success && (
              <p className="mt-2 text-green-500">{publishedState.success}</p>
            )}
          </form>
        </RenderConomponent>
      </CardContent>
    </Card>
  );
}
