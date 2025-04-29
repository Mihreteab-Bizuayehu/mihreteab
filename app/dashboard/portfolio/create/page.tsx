import Loading from '@/components/loading';
import PortfolioForm from '@/components/PortfolioForm';
import { Suspense } from 'react';
export default function CreatePortfolio() {
  return (
    <Suspense fallback={<Loading />}>
      <PortfolioForm />
    </Suspense>
  );
}
