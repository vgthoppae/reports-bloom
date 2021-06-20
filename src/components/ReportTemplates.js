import ReportHeader from './ReportHeader';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import StandardReports from './StandardReports';
import { Tabs, Tab} from 'react-bootstrap';
import CustomReports from './CustomReports';

const ReportTemplates = (props) => {
  const [key, setKey] = useState('standardReports');

  return (
    <>
      <ReportHeader />
      <br />
      <Container>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="standardReports" title="Standard Reports">
            <br />
            <StandardReports />
          </Tab>
          <Tab eventKey="customReports" title="Custom Reports">
            <br />
            <CustomReports />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default ReportTemplates;
