import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import protectedRoute from './protectedRoute';
import { CardColumns, Container } from 'react-bootstrap';
import ReportHeader from './ReportHeader';

const Dashboard = (props) => {
  console.log('rendering Dashboard now');

  // props.setTitle('Welcome Home...');

  // const getTitle = () => {
  //   return 'Welcome Home';
  // };

  return (
    <>
      <ReportHeader />
      <br />
      <Container>
        <CardColumns>
          <Card style={{ height: 220 }}>
            <Card.Body>
              <Card.Title>Log Reports</Card.Title>
              <Card.Text>
                Enter Weekly, Daily, Hourly or reports any custom period to
                capture the work accomplished, planned tasks, vacation plan or
                under any custom category.
              </Card.Text>
              <Button
                variant="outline-info"
                style={{ backgroundColor: '#343a40!important' }}
                href="#/reportStatus"
              >
                Take me there
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ height: 220 }}>
            <Card.Body>
              <Card.Title>Download Reports</Card.Title>
              <Card.Text>
                View the reports logged in the past, download them or get them
                emailed.
              </Card.Text>
              <br />
              <br />
              <Button
                variant="outline-info"
                style={{ backgroundColor: '#343a40!important' }}
              >
                Let's do it
              </Button>
            </Card.Body>
          </Card>
          <Card style={{ height: 220 }}>
            <Card.Body>
              <Card.Title>Report Templates</Card.Title>
              <Card.Text>
                Browse the available Report Templates to enable/disble them.
                Enabled Report templates will be available for all users.
              </Card.Text>
              <Button
                variant="outline-info"
                style={{ backgroundColor: '#343a40!important' }}
                href="#/reportStatus"
              >
                Take me there
              </Button>
            </Card.Body>
          </Card>
        </CardColumns>
      </Container>
    </>
  );
};

export default protectedRoute(Dashboard);
