import { ProfileSkeleton, PageHeaderSkeleton } from '@/components/shared/skeletons';

export default function Loading() {
  return (
    <div className="page-container">
      <PageHeaderSkeleton />
      <ProfileSkeleton />
    </div>
  );
}
