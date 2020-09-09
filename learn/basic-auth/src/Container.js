import React from 'react';

const Container = ({ children }) => {
  return <div style={styles.container}>{children}</div>;
};

const styles = {
  container: {
    margin: '0 auto',
    padding: '50px 100px',
  },
};

export default Container;
