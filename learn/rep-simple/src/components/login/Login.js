import React, { useLayoutEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, PageHeader, message } from 'antd';
import { Auth } from 'aws-amplify';
import { useLocation } from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 6,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 6,
  },
};

const Login = (props) => {
  console.log('rendering Login now');

  // if (props.user) props.history.push('/dashboard');

  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(undefined);

  const showErrorMessage = () => {
    message.error(`${errorMessage}`);
  };

  async function onFinish(param) {
    try {
      const { username, password } = param;
      console.log('Success:', { username });
      const user = await Auth.signIn(username, password);
      props.setUser(user);

      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        props.history.push('/changepassword');
      } else {
        props.history.push('/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message);
      console.log('submit failed');
      console.log('error signing in', err);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Login Failure:', errorInfo);
  };

  // useLayoutEffect(() => {
  console.log(`location is ${location.pathName}`);
  // async function doLogout() {
  //   try {
  //     await Auth.signOut();
  //     console.log('Logged out');
  //     // props.setUser(undefined);
  //     console.log('setting user to undefined');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // console.log(location.pathname);
  // if (location.pathname === '/logout') {
  //   doLogout();
  // }
  // }, [props, location]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Reports Bloom"
        subTitle="Please Login..."
      />
      <br />
      <br />
      <div>{errorMessage && showErrorMessage()}</div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input size="small" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
