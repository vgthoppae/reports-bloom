import React from 'react';
import { Alert, PageHeader } from 'antd';

const WeAreSorry = ({ content }) => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Reports Bloom"
        subTitle="We are sorry..."
      />

      <Alert
        message={content}
        type="error"
        showIcon
        banner="True"
        style={{ margin: '30px 20px 0px 20px' }}
      />
    </>
  );
};

export default WeAreSorry;
