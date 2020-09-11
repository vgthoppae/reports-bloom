import React from 'react';
import { Card } from 'antd';
import protectedRoute from './protectedRoute';
import WithMenu from './WithMenu';

const gridStyle = {
  width: '50%',
  textAlign: 'center',
  marginLeft: '200px',
  marginTop: '50px',
  position: 'relative',
  background: '#ececec',
};

const Dashboard = (props) => {
  console.log('rendering Dashboard now');

  return (
    <Card style={gridStyle} title="Dashboard">
      <Card.Grid style={{ width: '50%' }}>
        <a
          href="#/reportStatus"
          onClick={() => props.setSelectedMenu('reportStatus')}
        >
          Report Status
        </a>
      </Card.Grid>
      <Card.Grid style={{ width: '50%' }}>
        <a
          href="#/downloadReports"
          onClick={() => props.setSelectedMenu('downloadReports')}
        >
          Download Reports
        </a>
      </Card.Grid>
    </Card>
  );
};

export default protectedRoute(WithMenu(Dashboard));
