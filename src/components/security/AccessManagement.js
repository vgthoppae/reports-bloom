import React, { useState  } from 'react';
import Container from 'react-bootstrap/Container';
import ReportHeader from '../ReportHeader';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Chips from 'react-chips'
import { fetchIdpUsers } from '../../service/identityService'

const AccessManagement = (props) => {

  const [reviewers, setReviewers] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert('TBD')
  }

  const fetchMatchingUsers = async (value, callback) => {
    return new Promise(async (resolve, reject) => {
      const result = await fetchIdpUsers(value)
      resolve(result)
    })  
  }

  return (
    <>
      <ReportHeader />
      <br />
      <Container>
        <h2>Reports Access Management</h2>
        <br/>
        <Form noValidate onSubmit={handleSubmit} id="accessManagementForm">
          <Form.Group as={Row} controlId="accessMgmt.selectReportName">
            <Col sm={3}>
              <Form.Label>Report Name</Form.Label>
            </Col>
            <Col>
              <Form.Control as="select" name="reportName" custom>
                <option>Standard Status Report</option>
              </Form.Control>
            </Col>
          </Form.Group> 
          <br/>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Role</th>
                <th>Users</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Author</td>
                <td>All Users can author Standard Status Report</td>
              </tr>
              <tr>
                <td>Reviewer</td>
                <td>
                  <Chips value={reviewers}
                    onChange = {(items)=>setReviewers(items)}
                    placeholder="Enter User Name for suggestions"
                    fetchSuggestions={(value, callback) => {
                      return fetchMatchingUsers(value, callback)
                    }}
                    chipTheme= {{
                      chip: {
                        background: '#DEEEEA',
                        border: 'none'
                      }
                    }}
                  />

                </td>
              </tr>
              <tr>
                <td>Reader</td>
                <td>Enter user name for suggestions</td>
              </tr>
            </tbody>

          </Table>
          <br/>
          <Button variant="info" className="rounded-pill" type="submit">Apply Changes</Button>
        </Form>
      </Container>
    </>
  )

}

export default AccessManagement;