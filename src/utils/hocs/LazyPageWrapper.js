import React from "react";
import Loading from "@/components/Loading";

/**
 * @example
 * const LazyComponent=LazyPageWrapper(import('@/components/Example.js'))
 * */
export default impComponent => props => {
  const Component = React.lazy(_ => impComponent);
  return (
    <React.Suspense fallback={<Loading />}>
      <Component {...props} />
    </React.Suspense>
  )
};
