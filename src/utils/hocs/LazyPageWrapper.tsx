import React, { ComponentType } from 'react';
import Loading from '@/components/Loading';

/**
 * @example
 * const LazyComponent=LazyPageWrapper(()=>import('@/components/Example.js'))
 * */
export default (impComponent: () => Promise<{ default: ComponentType<any> }>) => (props: Record<string, any>) => {
  const LazyComponent = React.lazy(impComponent);
  return (
    <React.Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};
