import React from 'react';
import { styles } from './Form';
import Button from './Button';

function ForgotPassword(props) {
  return (
    <div style={styles.container}>
      <input
        name="username"
        onChange={(e) => {
          e.persist();
          props.updateFormState(e);
        }}
        style={styles.input}
        placeholder="username"
      />
      <Button onClick={props.forgotPassword} title="Forgot Password" />
    </div>
  );
}

export default ForgotPassword;
