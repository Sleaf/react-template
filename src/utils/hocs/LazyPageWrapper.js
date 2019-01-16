import React from "react";
import Loading from "@/components/Loading";

export default Component => props => (
  <React.Suspense fallback={<Loading />}>
    <Component {...props} />
  </React.Suspense>
);
