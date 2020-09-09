import React from 'react';
import { styles } from './Form';
import Button from './Button';

function SignUp({ signUp, updateFormState }) {
  return (
    <div style={styles.container}>
      <input
        name="username"
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="username"
      />
      <input
        name="password"
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="password"
      />
      <input
        name="email"
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="email"
      />
      <Button onClick={signUp} title="Sign Up" />
    </div>
  );
}

export default SignUp;
