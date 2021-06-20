import React, { createContext, useContext, useState } from 'react';

const AlertsContext = createContext();
export const useAlerts = () => useContext(AlertsContext);

const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([{}]);

  const pushAlert = (alert) => {
    const currentAlerts = [{ ...alerts }];
    currentAlerts.push(alert);
    setAlerts(currentAlerts);
  };

  return (
    <AlertsContext.Provider value={{ alerts, pushAlert }}>
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsProvider;
