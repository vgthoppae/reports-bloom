import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import '../App.css';
import Login from './login/Login';
import ChangePassword from './login/ChangePassword';
import ReportStatus from './ReportStatus';
import DownloadReports from './DownloadReports';
import ReportMenu from './ReportMenu';
import { Auth } from 'aws-amplify';
import WeAreSorry from './WeAreSorry';
import Dashboard from './Dashboard';

const ReportController = (props) => {
  const [user, setUser] = useState(null); //authenticated CognitoUser
  const [isLoggedIn, setLoggedIn] = useState(undefined); //if user is logged in
  const [reportStatusFormVals, setReportStatusFormVals] = useState(null); //Report Status form state

  //check to see if the user has loogged and pass that fact to the child components during render
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      setLoggedIn(true);
    } catch (err) {
      setLoggedIn(undefined);
    }
  }
  checkAuthState();

  console.log('******cheching user state*******');
  console.log(`${user ? user.userName : ''}`);

  return (
    <div className="App">
      <ReportMenu isLoggedIn={isLoggedIn} {...props} />
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Login user={user} setUser={setUser} {...props} />
            )}
          />
          <Route
            exact
            path="/logout"
            render={(props) => (
              <Login setUser={setUser} setLoggedIn={setLoggedIn} {...props} />
            )}
          />
          <Route
            exact
            path="/changepassword"
            render={(props) => <ChangePassword user={user} {...props} />}
          />
          <Route
            exact
            path="/reportStatus"
            render={(props) => (
              <ReportStatus
                user={user}
                reportStatusFormFieldsValue={reportStatusFormVals}
                setReportStatusFormFieldsValue={(obj) =>
                  setReportStatusFormVals(obj)
                }
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/downloadReports"
            render={(props) => (
              <DownloadReports
                reportStatusFormFieldsValue={reportStatusFormVals}
                {...props}
              />
            )}
          />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route>
            <WeAreSorry content="Oops..Sorry" {...props} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default ReportController;
