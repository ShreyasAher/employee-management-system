import { PageHeaderSkeleton, ChartSkeleton, TableSkeleton, StatCardSkeleton } from '@/components/shared/skeletons';

export default function Loading() {
  return (
    <div className="page-container space-y-4">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <ChartSkeleton height={240} />
      <TableSkeleton rows={6} cols={5} />
    </div>
  );
}
