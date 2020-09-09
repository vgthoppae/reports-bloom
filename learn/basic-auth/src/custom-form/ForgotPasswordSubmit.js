import React from 'react';
import { styles } from './Form';
import Button from './Button';

function ForgotPasswordSubmit(props) {
  return (
    <div style={styles.container}>
      <input
        name="confirmationCode"
        onChange={(e) => {
          e.persist();
          props.updateFormState(e);
        }}
        style={styles.input}
        placeholder="Confirmation Code"
      />
      <input
        name="password"
        onChange={(e) => {
          e.persist();
          props.updateFormState(e);
        }}
        style={styles.input}
        placeholder="New Password"
      />
      <Button onClick={props.forgotPasswordSubmit} title="Save New Password" />
    </div>
  );
}

export default ForgotPasswordSubmit;
