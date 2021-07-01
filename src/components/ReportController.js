import React, { useState, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import RegisterForm from './register-form';
// import { Auth } from 'aws-amplify';
import Dashboard from './Dashboard';
import ReportStatus from './ReportStatus';
import ExistingReports from './ExistingReports';
import ReportTemplates from './ReportTemplates';
import StandardReports from './StandardReports';
import CustomReports from './CustomReports';
import StandardWorkflow from './StandardWorkflow';
import CustomWorkflow from './CustomWorkflow';
import ReportWorkflow from './ReportWorkflow';
import AccessManagement from './security/AccessManagement';
import Auth from '../service/congnitoAuth'

const ReportController = (props) => {
  // const [user, setUser] = useState(undefined); //authenticated CognitoUser
  const [statusFormVals, setStatusFormVals] = useState(undefined); //Report Status form state
  // const [selectedMenu, setSelectedMenu] = useState('dashboard');
  // const [alerts, setAlerts] = useState();
  // const [currentPage, setCurrentPage] = useState();
  const [, setTitle] = useState();
  // const { alerts } = useAlerts();
  // const { user } = useReportEntry();

  const arrData = [{ alert: 'Nothing', cat: 'info' }];

  console.log('Rendering controller now...');

  // useEffect(() => {
  //   const location = window.location.href.split('/');
  //   const pathname = location[location.length - 1];
  //   setCurrentPage(pathname);
  // }, [props]);

  console.log('$$$$$$$ ReportController- body is firing $$$$$$$');

  useEffect(() => {
    console.log(
      '$$$$$$$ ReportController- useEffect constructor is firing $$$$$$$'
    );
    arrData.map(({ alert, cat }) => console.log({ alert }));

    return () => {
      console.log(
        '$$$$$$$ ReportController- useEffect destructor is firing $$$$$$$'
      );
    };
  });

  //this is needed to refresh the user value during component reloading
  // useLayoutEffect(() => {
  //   async function checkAuthState() {
  //     try {
  //       setUser(await Auth.currentAuthenticatedUser());
  //     } catch (err) {
  //       setUser(undefined);
  //     }
  //   }
  //   checkAuthState();
  // }, []);

  const location = window.location.href.split('/');
  const pathname = location[location.length - 1];

  // useEffect(() => {
  //   setTitle('Welcome Home...');
  // }, [pathname]);

  // useLayoutEffect(() => {
  //   async function checkAuthState() {
  //     try {
  //       // if (pathname === 'logout') {
  //       //   setUser(undefined);
  //       // }
  //       const user = await Auth.currentAuthenticatedUser();
  //       // setUser(user);
  //       console.log(`setting user to ${user.username} - redirecting to home`);

  //       props.history
  //         ? props.history.push('/home')
  //         : (props.location = '/home');
  //     } catch (err) {
  //       console.log(err);
  //       console.log('setting user to undefined');
  //       // setUser(undefined);
  //     }
  //   }
  //   checkAuthState();
  // }, [props, pathname]);

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
    // setUser(undefined);
    doLogout();
  }

  // if (user && pathname === '' && props.history)
  //   props.history.push('/dashboard');

  return (
    <>
      <div>
        <HashRouter>
          <Switch>
            <Route
              exact
              path={['/', '/home']}
              render={(props) => <Dashboard {...props} />}
            />

            <Route
              exact
              path={['/login']}
              render={(props) => (
                <Login setTitle={(t) => setTitle(t)} {...props} />
              )}
            />

            <Route
              exact
              path={['/registerconfirm']}
              render={(props) => (
                <RegisterForm setTitle={(t) => setTitle(t)} {...props} />
              )}
            />

            <Route
              exact
              path={['/reportStatus']}
              render={(props) => (
                <ReportStatus
                  setTitle={(t) => setTitle(t)}
                  statusFormVals={statusFormVals}
                  setStatusFormVals={(obj) => setStatusFormVals(obj)}
                  {...props}
                />
              )}
            />

            <Route
              exact
              path={['/existingReports']}
              render={(props) => <ExistingReports {...props} />}
            />

            <Route
              exact
              path={['/reportTemplates']}
              render={(props) => <ReportTemplates {...props} />}
            />

            <Route
              exact
              path={['/standardReports']}
              render={(props) => <StandardReports {...props} />}
            />

            <Route
              exact
              path={['/customReports']}
              render={(props) => <CustomReports {...props} />}
            />    
            <Route
              exact
              path={['/reportWorkflow']}
              render={(props) => <ReportWorkflow {...props} />}
            />              
            <Route
              exact
              path={['/standardWorkflow']}
              render={(props) => <StandardWorkflow {...props} />}
            />                      
            <Route
              exact
              path={['/customWorkflow']}
              render={(props) => <CustomWorkflow {...props} />}
            />     
            <Route
              exact
              path={['/accessMgmt']}
              render={(props) => <AccessManagement {...props} />}
            />                       
          </Switch>
        </HashRouter>
      </div>
    </>
  );
};

export default ReportController;
