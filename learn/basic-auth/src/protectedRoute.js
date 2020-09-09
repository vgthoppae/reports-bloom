import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';

const protectedRoute = (Comp, route = '/profile') => (props) => {
  useEffect(() => {
    async function checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser();
      } catch (err) {
        props.history.push(route);
      }
    }

    checkAuthState();
  }, [props]);

  return <Comp {...props} />;
};

export default protectedRoute;
