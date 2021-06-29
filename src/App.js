import React from 'react';
import './App.css';
import ReportController from './components/ReportController';
import ReportEntryDataProvider from './components/reportEntry-hook';
import AlertsProvider from './components/alerts-hook';
import Amplify from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

function App() {
  return (
    <div className="container-fluid">
      <AlertsProvider>
        <ReportEntryDataProvider>
          <ReportController />
        </ReportEntryDataProvider>
      </AlertsProvider>
    </div>  
  );
}

export default App;
