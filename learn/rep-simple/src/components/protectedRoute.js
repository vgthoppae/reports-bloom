import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';

const protectedRoute = (Comp, route = '/login') => (props) => {
  useEffect(() => {
    async function checkAuthState() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);
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
