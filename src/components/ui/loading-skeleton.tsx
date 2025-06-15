
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  variant?: 'card' | 'table' | 'form' | 'metrics';
  count?: number;
}

export function LoadingSkeleton({ variant = 'card', count = 1 }: LoadingSkeletonProps) {
  const renderCardSkeleton = () => (
    <div className="space-y-3 p-6 border rounded-lg">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-4 w-full" />
    </div>
  );

  const renderMetricsSkeleton = () => (
    <div className="space-y-3 p-6 border rounded-lg">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-8 w-1/3" />
    </div>
  );

  const renderFormSkeleton = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-1/4" />
    </div>
  );

  const renderTableSkeleton = () => (
    <div className="space-y-3">
      <div className="flex space-x-4">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex space-x-4">
          {[1, 2, 3, 4].map(j => (
            <Skeleton key={j} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );

  const skeletonMap = {
    card: renderCardSkeleton,
    metrics: renderMetricsSkeleton,
    form: renderFormSkeleton,
    table: renderTableSkeleton,
  };

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          {skeletonMap[variant]()}
        </div>
      ))}
    </>
  );
}
