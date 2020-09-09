import React from 'react';
import { styles } from './Form';
import Button from './Button';

function SignIn({ signIn, updateFormState }) {
  return (
    <div style={styles.container}>
      <input
        type="text"
        id="username"
        name="username"
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="username"
        required
      />
      <input
        type="password"
        name="password"
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="password"
        required
      />
      <Button onClick={signIn} title="Sign In" />
    </div>
  );
}

export default SignIn;
