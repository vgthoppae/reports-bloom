import React from 'react';

const DownloadReports = ({ reportStatusFormFieldsValue }) => {
  const getVals = (obj) => {
    let val = '';
    for (const [key, value] of Object.entries(obj)) {
      val += `${key}: ${value}`;
    }
    return val;
  };

  return (
    <>
      <h1>Download Reports here...</h1>
      <p>
        {}
        {reportStatusFormFieldsValue
          ? getVals(reportStatusFormFieldsValue)
          : ''}
      </p>
    </>
  );
};

export default DownloadReports;
