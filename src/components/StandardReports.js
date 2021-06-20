import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { addReportTableItem } from '../service/StatusEntryService';
import { getCurrentOrg, getCurrentUser } from '../service/CommonUtils';
import Image from 'react-bootstrap/Image';
import statusreport from './statusreport-template.png';
import Container from 'react-bootstrap/Container';
import ReportToast from './ReportToast';
import Chips from 'react-chips'

const StandardReports = (props) => {

  const [showClientNameEntry, setShowClientNameEntry] = useState();
  const [clientName, setClientName] = useState();
  const [allClientNames, setAllClientNames] = useState([]);

  const org = getCurrentOrg();

  const toggleClientNameSection = (e) => {
    setShowClientNameEntry(e.currentTarget.form.clientNameQuestion.value === 'choice');
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('hello')
    //event.currentTarget.enableReport.value
    //event.currentTarget.reportName.value
    //event.currentTarget.clientNameQuestion.value
    //allClientNames
  }

  const deleteClient = (e) => {
    const clickedClient = e.currentTarget.previousSibling.innerText;
    const newClientNames = allClientNames.filter((val) => {
      console.log(val != clickedClient);
      return val != clickedClient;
    });
    setAllClientNames(newClientNames);
  };

  const updateClientConfigDb = async () => {
    const clientSet = new Set(allClientNames);
    // const user = await Auth.currentAuthenticatedUser();
    try {
      const entry = {
        pk: `org=${org}#clientconfig`,
        sk: moment.now().valueOf(),
        description: clientSet,
      };
      await addReportTableItem(entry);
      console.log('config updated');
      // setAlert('Status updated!!');
    } catch (err) {
      console.log('config report form failed', err);
      // setAlert('Update failed!!');
    }
  };

  const updateClientName = async (e) => {
    if (allClientNames.includes(clientName)) {
      return; //no action needed - duplicate value
    }
    const newClientNames = allClientNames.slice();
    newClientNames.push(clientName);
    setAllClientNames(newClientNames);
    e.currentTarget.form.clientName.value = '';
    await updateClientConfigDb();
  };

  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
  };

  return (
    <>
      <Container>
        <h3>Report Template</h3>
        <br />
        <ReportToast />
        <Form noValidate onSubmit={handleSubmit} id="enableReportForm">
          <Form.Group as={Row} controlId="reportTemplate.selectName">
            <Col sm={3}>
              <Form.Label>Template Name</Form.Label>
            </Col>
            <Col>
              <Form.Control as="select" name="reportName" custom>
                <option>Standard Status Report</option>
              </Form.Control>
            </Col>
          </Form.Group>
          <h4>Configuration</h4>
          <br />
          <Form.Group as={Row}>
            <Col sm={3}>
              <Form.Label>Client Name</Form.Label>
            </Col>
            <Col>
              <Form.Check
                type={'radio'}
                id="clientName-freeform"
                name="clientNameQuestion"
                value={'freeform'}
                label="Free Form - The users are free to enter the Client Name"
                onChange={(e) => toggleClientNameSection(e)}
                defaultChecked
              />
              <Form.Check
                type={'radio'}
                id="clientName-choice"
                name="clientNameQuestion"
                value={'choice'}
                label="No - I would like to define the Client Name Choices"
                onChange={(e) => toggleClientNameSection(e)}
              />
            </Col>
          </Form.Group>
          {showClientNameEntry === true && (
            <Form.Group as={Row}>
              <Col sm={3}>
                <Form.Label>Enter the Client Name Choices</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  name="clientName"
                  id="clientName"
                  val={clientName}
                  onChange={(event) => handleClientNameChange(event)}
                />
                <br/>
                <Button
                  variant="secondary"
                  className="rounded-pill"
                  onClick={(event) => updateClientName(event)}
                >
                  Add Client Name
                </Button>
              </Col>
              <Col>
                <Chips value={allClientNames}
                      onChange = {(items)=>setAllClientNames(items)}
                      placeholder="Add Client Names"
                      chipTheme= {{
                        chip: {
                          background: '#DEEEEA'
                        }
                      }}
                      />
            
              </Col>
            </Form.Group>
          )}
          <br/>
          <Form.Group as={Row} controlId="reportTemplate.enableReport">
            <Col sm={3}>
              <Form.Label>Enable this Report</Form.Label>
            </Col>
            <Col>
              <Form.Check type='checkbox' id="enableReport-checkbox" name= "enableReport" />
            </Col>
          </Form.Group>
          <br/>
          <Button variant="info" className="rounded-pill" type="submit">Apply Changes</Button>
        </Form>
        {/* <Image src={statusreport} fluid /> */}
      </Container>
    </>
  )

}

export default StandardReports;