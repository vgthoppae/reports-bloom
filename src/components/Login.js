import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Auth, Hub, Logger } from 'aws-amplify';

const authChallengePathMap = {
  "NEW_PASSWORD_REQUIRED": "/registerconfirm"
}

const Login = (props) => {
  const logger = new Logger('LoginForm');
  const history = useHistory();

  useEffect(() => {
    Hub.listen("auth_channel", (data) => {
      console.log(data.payload.user)
      console.log("Hub received messages at Login form")
    });

    // Auth.currentAuthenticatedUser({
    //     bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    // }).then(user => {
    //     if (user)
    //         history.push("/")

    // }).catch(err => console.log(err));

    return function cleanup() {
      logger.info("Removing HUB subscription to " + "auth");
      Hub.remove("auth_channel", (data) => {
        console.log("Hub removing channel subscription at Login form")
      });
    };
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target
    let user = undefined
    try {
      user = await Auth.signIn(form.email.value, form.password.value);
    } catch (error) {
      console.log(error)
      return
    }

    if (user.challengeName)
      history.push(authChallengePathMap[user.challengeName]);
    else
      history.push('/home')


    Hub.dispatch("auth_channel", {
      event: "sign_in",
      success: true,
      message: "Sign in completed",
      username: form.email.value,
      user: user,
    });


    // if (user.challengeName === "NEW_PASSWORD_REQUIRED") {

    // }

    // alert('yes')
  }

  return (
    <>
      <div style={{ marginTop:'10px'}}>
        <img
          src="logo-greenletters.png"
          width="200"
          height="30"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
      <div className="auth-wrapper">
        <br />
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input type="email" name="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
              </div>
            </div>

            <button type="submit" className="btn dark-button btn-block">Submit</button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;