import React from 'react';
import { styles } from './Form';
import Button from './Button';

function ConfirmSignUp(props) {
  return (
    <div style={styles.container}>
      <input
        name="confirmationCode"
        onChange={(e) => {
          e.persist();
          props.updateFormState(e);
        }}
        style={styles.input}
        placeholder="confirmation code"
      />
      <Button onClick={props.confirmSignup} title="Confirm Sign Up" />
    </div>
  );
}

export default ConfirmSignUp;
