// import {Button, Form, Input, notification, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Auth, Hub, Logger} from 'aws-amplify';
// import {AuthService} from "../../services/auth-service";
// import {LockOutlined, UserOutlined} from "@ant-design/icons";

const RegisterForm = (props) => {

    const logger = new Logger("RegisterForm");
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");
    const [userNotConfirmed, setUserNotConfirmed] = useState(false);

    const user = undefined

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target
        const ret = await Auth.changePassword(props.user, form.email.value, form.password.value)
        console.log(ret)
    }

    return (
        <div className="auth-wrapper">
        <br />
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Change Password</h3>
  
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" name="currentPassword" className="form-control" placeholder="Enter current password" />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input type="password" name="newPassword" className="form-control" placeholder="Enter New password" />
            </div>            
  
            <button type="submit" className="btn btn-dark btn-block">Submit</button>
          </form>
        </div>
      </div>
    )

}

export default RegisterForm;
