import React from 'react';
import ReportMenu from './ReportMenu';

const WithMenu = (Comp) => (props) => {
  return (
    <>
      <ReportMenu
        user={props.user}
        selectedMenu={props.selectedMenu}
        setSelectedMenu={props.setSelectedMenu}
        doLogout={props.doLogout}
        {...props}
      />
      <br />
      <Comp {...props} />
    </>
  );
};

export default WithMenu;
