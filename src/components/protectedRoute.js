import React, { useEffect } from 'react';
// import { Auth } from 'aws-amplify';
import Auth from '../service/congnitoAuth'

const protectedRoute = (Comp, route = '/login') => (props) => {
  useEffect(() => {
    async function checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser();
      } catch (err) {
        console.log(err);
        props.history.push(route);
      }
    }
    checkAuthState();
  }, [props]);

  return <Comp {...props} />;
};

export default protectedRoute;
