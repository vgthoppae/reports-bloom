import React, { createContext, useContext, useState } from 'react';

const ReportEntryContext = createContext();
export const useReportEntry = () => useContext(ReportEntryContext);

const ReportEntryDataProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({});

  const setReportEntry = (newData) => {
    const newSharedData = { ...sharedData, reportEntry: newData };
    setSharedData(newSharedData);
  };

  const reportEntry = () => {
    return sharedData && sharedData.reportEntry ? sharedData.reportEntry : {};
  };

  const repSearch = () => {
    return sharedData && sharedData.repSearch ? sharedData.repSearch : {};
  };

  const setRepSearch = (newData) => {
    const newSharedData = { ...sharedData, repSearch: newData };
    setSharedData(newSharedData);
  };

  const setUser = (newData) => {
    const newSharedData = { ...sharedData, user: newData };
    setSharedData(newSharedData);
  };

  const user = () => {
    return sharedData ? sharedData.user : undefined;
  };

  const getAlert = () => {
    return sharedData ? sharedData.alert : undefined;
  };

  const setAlert = (alert) => {
    const newSharedData = { ...sharedData, alert };
    setSharedData(newSharedData);
  };

  return (
    <ReportEntryContext.Provider
      value={{
        reportEntry,
        setReportEntry,
        user,
        setUser,
        repSearch,
        setRepSearch,
        getAlert,
        setAlert,
      }}
    >
      {children}
    </ReportEntryContext.Provider>
  );
};

export default ReportEntryDataProvider;
