import React, { useState } from 'react';
import { Toast, ToastBody } from 'react-bootstrap';
import { useReportEntry } from './reportEntry-hook';

const ReportToast = (props) => {
  const [show, setShow] = useState(true);
  const { getAlert, setAlert } = useReportEntry();

  const onHide = () => {
    setShow(false);
    setAlert(undefined);
  };

  return (
    <div>
      {getAlert() && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Toast onClose={onHide} show={show} delay={3000} autohide>
            <ToastBody
              style={{
                backgroundColor: '#fff0f0',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {getAlert()}
            </ToastBody>
          </Toast>
          <br />
        </div>
      )}
    </div>
  );
};

export default ReportToast;
