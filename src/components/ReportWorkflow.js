import ReportHeader from './ReportHeader';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import StandardReports from './StandardReports';
import { Tabs, Tab} from 'react-bootstrap';
import CustomReports from './CustomReports';
import StandardWorkflow from './StandardWorkflow';
import CustomWorkflow from './CustomWorkflow';

const ReportWorkflow = (props) => {
  const [key, setKey] = useState('standardWorkflow');

  return (
    <>
      <ReportHeader />
      <br />
      <Container>
        <Tabs
          id="controlled-workflow"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="standardWorkflow" title="Standard Workflow">
            <br />
            <StandardWorkflow />
          </Tab>
          <Tab eventKey="customWorkflow" title="Custom Workflow">
            <br />
            <CustomWorkflow />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default ReportWorkflow;
