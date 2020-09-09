import React from 'react';
import { Form, Input, Button, Checkbox, PageHeader } from 'antd';
import { Auth } from 'aws-amplify';

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

const ChangePassword = (props) => {
  async function onFinish({ password }) {
    try {
      const user = props.user;
      await Auth.completeNewPassword(user, password);
      props.history.push('/dashboard');
    } catch (err) {
      console.log('error signing in', err);
    }
  }

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Reports Bloom"
        subTitle="Please Change Password..."
      />
      <br />
      <br />
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your New password!',
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
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
