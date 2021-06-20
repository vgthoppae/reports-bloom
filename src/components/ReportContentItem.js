import React from 'react';
import { Container } from 'react-bootstrap';
import TinyEditor from './tinyeditor';

const ReportContentItem = ({ title, value }) => {
  return (
    <Container>
      <br />
      <h3 className="repContentItemTitle">{title}</h3>
      <br />
      {/* <span>{value}</span> */}
      <TinyEditor editorContent={value} disabled={true} />
    </Container>
  );
};

export default ReportContentItem;
