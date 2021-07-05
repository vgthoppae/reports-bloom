import React, { Fragment, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useReportEntry } from './reportEntry-hook';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';
import { MinusCircleTwoTone, PlusCircleTwoTone } from '@ant-design/icons';
// import { addReportEntry, getReportEntry } from '../service/StatusEntryService';
import { putReportItemEntry, getReportItemEntry } from '../service/daoService';
import protectedRoute from './protectedRoute';
import ReportHeader from './ReportHeader';
import { Auth } from 'aws-amplify';
import ReportToast from './ReportToast';
import { getCurrentOrg } from '../service/CommonUtils';
import TinyEditor from './tinyeditor';

const ReportStatus = (props) => {
  const [rteContents, setRteContents] = React.useState([]);
  const [age, setAge] = useState();
  const { reportEntry, setReportEntry, setAlert } = useReportEntry();
  let user = undefined;
  // const { pushAlert } = useAlerts();
  const org = getCurrentOrg();

  const getPeriodInStorageFormat = (val) => {
    return val.format('MM/DD/YYYY');
  };

  const initRteContent = (index) => {
    if (rteContents.length === index) {
      const newRteContents = rteContents;
      newRteContents.push('');
      setRteContents(newRteContents);
    }
  };

  const setRteContentItem = (content, index) => {
    const newRteContents = rteContents;
    newRteContents[index] = content;
    setRteContents(newRteContents);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const period = event.target.selectedPeriod.value.replace(/\s+/g, '');

    const description = {};
    reportEntry().statusFields.map(({ key, value }, index) => {
      description[key] = rteContents[index];
    });
    // reportEntry().statusFields.map(({ key, value }) => {
    // find the index of each key
    // const index = reportEntry().index[key]
    // const index = 0
    // const variableName = `statusDesc${index}`
    // description[key] = eval(variableName);
    // console.log(description[key]);
    // });

    if (user === undefined) user = await Auth.currentAuthenticatedUser();
    try {
      const arg = {
        pk: `org=${org}#user=${user.username}`,
        sk: period,
        entry: [{key: 'task completed', desc: 'Worked on AppSync'}],
      };
      console.log(period);
      await putReportItemEntry(arg);
      console.log('status updated');
      setAlert('Status updated!!');
    } catch (err) {
      console.log('status report form failed', err);
      setAlert('Update failed!!');
    }
  };

  const onAgeChange = (event) => {
    setAge(event.target.value);
    setReportEntry({ ...reportEntry(), age: event.target.value });
  };

  const onWeekChange = (val) => {
    setReportEntry({ ...reportEntry(), currentWeek: val });
    console.log(reportEntry());
  };

  const onPeriodChange = async (start, end, label) => {
    setReportEntry({ ...reportEntry(), startPeriod: start, endPeriod: end });
    const period = `${getPeriodInStorageFormat(
      start
    )}-${getPeriodInStorageFormat(end)}`;
    const statusFields = await getReportEntriesForPeriod(period);
    setReportEntry({ ...reportEntry(), statusFields });
  };

  const getReportEntriesForPeriod = async (period) => {
    if (user === undefined) user = await Auth.currentAuthenticatedUser();

    // const pk = `org=${org}#user=${user.username}`;
    // const pk = `org=loc#reports=stdstatus#userid=org=loc#user=${user.username}`
    const input = {
      pk: `org=loc#user=${user.username}`,
      sk: period
    }
    const desc = await getReportItemEntry(input);
    const statusFields = [];
    let newRteContents = [];

    if (!desc) {
      //if there is no entry, set a row with 'Tasks Completed' key
      statusFields.push({ key: 'Tasks Completed', value: '' });
      setRteContents(newRteContents);
    } else {
      //convert database results into presentation format
      for (const prop in desc) {
        statusFields.push({
          key: prop,
          value: desc[prop],
        });
        newRteContents.push(desc[prop]);
      }
      setRteContents(newRteContents);
    }
    return statusFields;
  };

  const handleAddFields = () => {
    const statusFields = [...reportEntry().statusFields];
    statusFields.push({
      key: '',
      value: '',
    });
    setReportEntry({ ...reportEntry(), statusFields });
  };

  const handleRemoveFields = (index) => {
    const statusFields = [...reportEntry().statusFields];
    statusFields.splice(index, 1);
    setReportEntry({ ...reportEntry(), statusFields });
  };

  const handleInputChange = (index, event) => {
    const statusFields = [...reportEntry().statusFields];
    if (event.target.name.includes('statusFieldKey')) {
      statusFields[index].key = event.target.value;
    } else {
      statusFields[index].value = event.target.value;
    }
    setReportEntry({ ...reportEntry(), statusFields });
  };

  const displayAddField = (index) => {
    //first row and if that is the only row
    if (index === 0 && reportEntry().statusFields.length === 1) return 1;

    //last row
    if (index === reportEntry().statusFields.length - 1) return 1;

    //all other rows
    return undefined;
  };

  const displayRemoveField = (index) => {
    //first row and if that is the only row
    if (index === 0 && reportEntry().statusFields.length === 1)
      return undefined;

    //last row
    if (index === reportEntry().statusFields.length - 1) return 1;

    //all other rows
    return 1;
  };

  const getStartPeriod = () => {
    return reportEntry().startPeriod
      ? reportEntry().startPeriod
      : moment().startOf('isoweek');
  };

  const getEndPeriod = () => {
    return reportEntry().endPeriod
      ? reportEntry().endPeriod
      : moment().endOf('isoweek');
  };

  const updateFormValues = async () => {
    //read the current period and retrieve the existing report entries for this period
    //the period value is read from the control instead of state becase during the initial
    //display the state value is not set
    const period = document.forms.reportEntryForm.selectedPeriod.value.replace(
      /\s+/g,
      ''
    );
    const statusFields = await getReportEntriesForPeriod(period);

    console.log(statusFields);

    //if the currentWeek choice is made, use it otherwise default to yes
    const currentWeek =
      reportEntry().currentWeek === undefined
        ? 'yes'
        : reportEntry().currentWeek;

    //update the state
    setReportEntry({ ...reportEntry(), statusFields, currentWeek });
  };

  useEffect(() => {
    //call at every render
    updateFormValues();
  }, []);

  return (
    <>
      <ReportHeader />
      <br />
      <Container>
        <h4>Status Report</h4>
        <br />
        <ReportToast />

        <Form noValidate onSubmit={handleSubmit} id="reportEntryForm">
          {/* <Form.Group as={Row} controlId="isCurrentWeek">
            <Form.Label column sm={3}>
              Current Week?
            </Form.Label>
            <Col sm={3} style={{ paddingTop: 5 }}>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="isCurrentWeek"
                id="yesCurrentWeek"
                value="yes"
                checked={reportEntry().currentWeek === 'yes'}
                onChange={(e) => onWeekChange(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="isCurrentWeek"
                id="noCurrentWeek"
                value="no"
                checked={reportEntry().currentWeek === 'no'}
                onChange={(e) => onWeekChange(e.target.value)}
              />
            </Col>
          </Form.Group> */}
          <Form.Group as={Row} controlId="selectedPeriod">
            <Form.Label column sm={3}>
              Select the Period
            </Form.Label>
            <Col sm={3}>
              <DateRangePicker
                initialSettings={{
                  startDate: getStartPeriod(),
                  endDate: getEndPeriod(),
                }}
                onCallback={onPeriodChange}
              >
                <Form.Control type="text" name="selectedPeriod" />
              </DateRangePicker>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Client Name
            </Form.Label>
            <Col sm={3} style={{ paddingTop: 5 }}>
              <Form.Control
                type="text"
                name="age"
                id="age"
                value={age}
                onChange={onAgeChange}
              />
            </Col>
          </Form.Group>

          <br />

          <Form.Label>
            Provide Status below under any key (at least one status entry is
            required). Add/Remove rows with the corresponding icons.
          </Form.Label>
          <br />
          <br />

          {reportEntry().statusFields &&
            reportEntry().statusFields.map((stat, index) => (
              <Fragment key={`statusField-${index}`}>
                <Form.Group as={Row} controlId="statusField{index}">
                  <Col sm={3}>
                    <Form.Control
                      type="text"
                      name="statusFieldKey{index}"
                      value={stat.key}
                      placeholder="Enter a Key"
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </Col>
                  <Col sm={8}>
                    {/* <Form.Control
                      as="textarea"
                      rows="4"
                      name="statusFieldValue{index}"
                      value={stat.value}
                      placeholder="Provide Status for the Key"
                      onChange={(event) => handleInputChange(index, event)}
                    /> */}
                    {initRteContent(index)}
                    <TinyEditor
                      editorContent={rteContents[index]}
                      setEditorContent={setRteContentItem}
                      index={index}
                    />
                  </Col>
                  <Col>
                    {displayAddField(index) && (
                      <PlusCircleTwoTone
                        twoToneColor="#8fc0a9"
                        onClick={() => handleAddFields(index)}
                        style={{ fontSize: 30 }}
                      />
                    )}
                    &nbsp;
                    {displayRemoveField(index) && (
                      <MinusCircleTwoTone
                        twoToneColor="#ffb0b0"
                        onClick={() => handleRemoveFields(index)}
                        style={{ fontSize: 30 }}
                      />
                    )}
                  </Col>
                </Form.Group>
              </Fragment>
            ))}

          <br />
          <button
            style={{
              border: 'none',
              padding: '10px 20px',
              borderRadius: '16px',
              backgroundColor: '#343a40',
              fontFamily: 'Biotif,sans-serif',
              fontWeight: 500,
              fontSize: '15px',
              color: '#5F9EA0',
            }}
          >
            Submit
          </button>
        </Form>
      </Container>
    </>
  );
};

export default protectedRoute(ReportStatus);
