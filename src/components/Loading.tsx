import React from "react";

export default ({ loaded }) => (
  <div className='holder no-touch'>
    {
      loaded
        ? <span className='no-data'>No Data</span>
        : <span className='label'>Loading...</span>
    }
  </div>
);
