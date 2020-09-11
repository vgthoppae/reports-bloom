import React, { useState, useEffect, useLayoutEffect } from 'react';
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
  const [user, setUser] = useState(undefined); //authenticated CognitoUser
  const [reportStatusFormVals, setReportStatusFormVals] = useState(null); //Report Status form state
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  console.log('Rendering controller now...');

  //check to see if the user has loogged and pass that fact to the child components during render
  useEffect(() => {
    async function checkAuthState() {
      try {
        setUser(await Auth.currentAuthenticatedUser());
      } catch (err) {
        setUser(undefined);
      }
    }
    checkAuthState();
  }, []);

  const location = window.location.href.split('/');
  const pathname = location[location.length - 1];

  useLayoutEffect(() => {
    async function checkAuthState() {
      try {
        if (pathname === 'logout') {
          setUser(undefined);
        }
        setUser(await Auth.currentAuthenticatedUser());
      } catch (err) {
        setUser(undefined);
      }
    }
    checkAuthState();
  }, []);

  const doLogout = async () => {
    try {
      console.log('logging out now');
      await Auth.signOut();
      console.log('Logged out');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(`pathname is ${pathname ? pathname : 'undefined'}`);
  if (pathname === '/logout') {
    setUser(undefined);
    doLogout();
  }

  // if (user && pathname === '' && props.history)
  //   props.history.push('/dashboard');

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route
            exact
            path={['/', '/dashboard']}
            render={(props) => (
              <Dashboard
                user={user}
                setUser={setUser}
                doLogout={doLogout}
                selectedMenu={selectedMenu}
                setSelectedMenu={(m) => setSelectedMenu(m)}
                {...props}
              />
            )}
          />
          <Route
            exact
            path={['/login', '/logout']}
            render={(props) => <Login setUser={setUser} {...props} />}
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
                doLogout={doLogout}
                selectedMenu={selectedMenu}
                setSelectedMenu={(m) => setSelectedMenu(m)}
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
                user={user}
                doLogout={doLogout}
                selectedMenu={selectedMenu}
                setSelectedMenu={(m) => setSelectedMenu(m)}
                reportStatusFormFieldsValue={reportStatusFormVals}
                {...props}
              />
            )}
          />
          <Route>
            <WeAreSorry content="Oops..Sorry" {...props} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
};

export default ReportController;
