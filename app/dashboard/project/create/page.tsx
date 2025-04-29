import Loading from '@/components/loading';
import { Suspense } from 'react';

export default function ProjectForm() {
  return (
    <Suspense fallback={<Loading />}>
      <Loading />
    </Suspense>
  );
}
