import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import StandardWorkflowRenderer from './StandardWorkflowRenderer';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Table } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

const StandardWorkflow = (props) => {

  const handleSubmit = () => { };

  return (
    <>
      <Container>
        <h3>Workflow</h3>
        <br />
        <Form noValidate onSubmit={handleSubmit} id="stdWorkflowSelectForm">
          <Form.Group as={Row} controlId="stdWorkflow.selectName">
            <Col sm={3}>
              <Form.Label>Template Name</Form.Label>
            </Col>
            <Col>
              <Form.Control as="select" custom>
                <option>Consultant Status Report</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
        <br />
        <StandardWorkflowRenderer />

        <h4 style={{ marginBottom: '40px', marginTop: '40px' }}>Manage Roles</h4>

        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Understand Available Roles
        </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Author</td>
                      <td>Author</td>
                    </tr>
                    <tr>
                      <td>Reviewer</td>
                      <td>Review and Publish</td>
                    </tr>
                    <tr>
                      <td>Reader</td>
                      <td>Read</td>
                    </tr>
                  </tbody>

                </Table>

              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Assign Users to Roles
        </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                Roles Assignment goes here
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>






      </Container>
    </>
  )

}

export default StandardWorkflow;