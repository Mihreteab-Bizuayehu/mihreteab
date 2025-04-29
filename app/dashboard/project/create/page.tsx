import Loading from '@/components/loading';
import ProjectForm from '@/components/ProjectForm';
import { Suspense } from 'react';

export default function CreateProject() {
  return (
    <Suspense fallback={<Loading />}>
      <ProjectForm />
    </Suspense>
  );
}
