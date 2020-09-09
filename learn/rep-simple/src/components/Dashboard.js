import React from 'react';
import { Card } from 'antd';

const gridStyle = {
  width: '50%',
  textAlign: 'center',
  'margin-left': '200px',
  'margin-top': '50px',
  position: 'relative',
  background: '#ececec',
};

const Dashboard = () => {
  return (
    <Card style={gridStyle} title="Dashboard">
      <Card.Grid style={{ width: '50%' }}>
        <a href="/#/reportStatus">Report Status</a>
      </Card.Grid>
      <Card.Grid style={{ width: '50%' }}>
        <a href="/#/downloadReports">Download Reports</a>
      </Card.Grid>
    </Card>
  );
};

export default Dashboard;
