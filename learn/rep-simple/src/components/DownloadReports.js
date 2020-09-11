import React from 'react';
import WithMenu from './WithMenu';
import protectedRoute from './protectedRoute';

const DownloadReports = (props) => {
  console.log('rendering DownloadReports now');

  // const getVals = (obj) => {
  //   let val = '';
  //   for (const [key, value] of Object.entries(obj)) {
  //     val += `${key}: ${value}`;
  //   }
  //   return val;
  // };

  return (
    <>
      <h1>Download Reports here...</h1>
      {/* <p>
        {}
        {props.reportStatusFormFieldsValue
          ? getVals(props.reportStatusFormFieldsValue)
          : ''}
      </p> */}
    </>
  );
};

export default protectedRoute(WithMenu(DownloadReports));
