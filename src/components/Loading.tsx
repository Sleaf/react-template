import React from 'react';

type Props = {
  loaded?: boolean;
};
export default ({ loaded }: Props) => (
  <div className="holder no-touch">
    {loaded ? <span className="no-data">No Data</span> : <span className="label">Loading...</span>}
  </div>
);
