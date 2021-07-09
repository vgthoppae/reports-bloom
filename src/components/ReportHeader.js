import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { UserOutlined } from '@ant-design/icons';
import { useReportEntry } from './reportEntry-hook';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
// import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import Auth from '../service/congnitoAuth';
// import FittedImage from 'react-fitted-image';

const ReportHeader = (props) => {
  const { user, setUser } = useReportEntry();
  const history = useHistory();

  const doLogout = async () => {
    try {
      console.log('logging out now');
      await Auth.signOut();
      setUser(undefined);
      history.push('/');
      console.log('Logged out');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand
        href="#home"
        style={{ fontFamily: 'Biotif,sans-serif', fontWeight: 500 }}
      >
        <span style={{ color: '#5F9EA0' }}>team</span>
        <span style={{ color: '#6B8E23' }}>reports</span>
      </Navbar.Brand>

      {/* <div>
        <img
          src="logo-greenletters.png"
          width="125"
          height="20"
          style={{
            objectFit: 'contain',
          }}
        />
      </div> */}

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home" style={{ color: '#5F9EA0' }}>
            Home
          </Nav.Link>
          <Nav.Link href="#reportStatus" style={{ color: '#5F9EA0' }}>
            New Reports
          </Nav.Link>
          <Nav.Link href="#existingReports" style={{ color: '#5F9EA0' }}>
            Existing Reports
          </Nav.Link>
          <Nav.Link href="#reportTemplates" style={{ color: '#5F9EA0' }}>
            Report Templates
          </Nav.Link>
          <Nav.Link href="#reportWorkflow" style={{ color: '#5F9EA0' }}>
            Report Workflow
          </Nav.Link>
          <Nav.Link href="#accessMgmt" style={{ color: '#5F9EA0' }}>
            Access Management
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Brand href="#home" style={{ color: '#5F9EA0' }}>
        AgileVision Software
      </Navbar.Brand>

      <DropdownButton
        alignRight
        variant="light"
        size="sm"
        id="dropdown-basic-button"
        title={
          <>
            <span>{user() ? user().username : ''}</span>
            <UserOutlined
              style={{
                fontSize: '20px',
                color: '#5F9EA0',
              }}
            />
          </>
        }
        drop="down"
        style={{ borderStyle: 'none' }}
      >
        <Dropdown.Item onClick={doLogout}>Logout</Dropdown.Item>
      </DropdownButton>
    </Navbar>
  );
};

export default ReportHeader;
