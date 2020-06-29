import React, { ComponentType } from 'react';
import Loading from '@/components/Loading';

/**
 * @example
 * const LazyComponent=LazyPageWrapper(()=>import('@/components/Example.js'))
 * */
type LazyComp<T> = () => Promise<{ default: T }>;
export default <T extends ComponentType<any>>(impComponent: LazyComp<T>): ComponentType => (props: any) => {
  const LazyComponent = React.lazy(impComponent);
  return (
    <React.Suspense fallback={<Loading />}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};
