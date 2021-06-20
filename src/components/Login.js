import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
// import { Auth } from 'aws-amplify';
import { useReportEntry } from './reportEntry-hook';
import Auth from '../service/congnitoAuth'

const Login = (props) => {
  const [validated, setValidated] = useState(false);
  const { setUser } = useReportEntry();

  console.log('rendering Login now');

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      event.preventDefault();
      return;
    }

    event.preventDefault();

    try {
      const user = await Auth.signIn(form.userId.value, form.password.value);

      // const user1= await Auth.currentAuthenticatedUser();

      // const ret = await Auth.changePassword(user, "password", "newpassword")

      // Auth.currentAuthenticatedUser()
      //   .then(user => {
      //     return Auth.changePassword(user, 'password', 'newpassword');
      //   })
      //   .then(data => console.log(data))
      //   .catch(err => console.log(err));

      setUser(user);
      console.log(user);
      setValidated(true);
      // props.setAlerts(undefined);
      props.history.push('/home');
    } catch (err) {
      setUser(undefined);
      console.log('login failed', err);
      // props.setAlerts(err.message);
      setValidated(false);
    }
  };

  return (
    <>
      <br />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={5}>
            <br />
            <p
              style={{ color: '#007bff' }}
              className="d-flex justify-content-center display-4"
            >
              Sign In
            </p>
            <br />
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              method="POST"
            >
              <Form.Row className="align-items-center">
                <Col>
                  <Form.Control
                    required
                    type="text"
                    name="userId"
                    placeholder="User Id"
                  />
                </Col>
              </Form.Row>
              <br />
              <Form.Row className="align-items-center">
                <Col>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Col>
              </Form.Row>
              <br />
              <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit" style={{}}>
                  Submit
                </Button>
              </div>
            </Form>
            <div className="d-flex">
              <a className="mr-auto p-2" href="/home">
                Forgot Password?
              </a>
              <a className="p-2" href="/home">
                Forgot User Id?
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <div
        className="d-flex"
        style={{ position: 'absolute', bottom: 0, marginBottom: 5 }}
      >
        <a className="mr-auto p-2" href="/home">
          <small>@Copyrights Reserved</small>
        </a>
        <a href="/home" className="p-2">
          <small>Terms and Conditions</small>
        </a>
      </div>
    </>
  );
};

export default Login;
