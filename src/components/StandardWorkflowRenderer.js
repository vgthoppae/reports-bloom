import React from 'react';
import { Container } from 'react-bootstrap';
import ReactFlow from 'react-flow-renderer';

const style = {
  background: '#DFEEEA',
  width: '100%',
  height: 350
};

const connectionLineStyle = { stroke: '#fff' };

const elements = [
  {
    id: '1',
    type: 'input', // input node
    sourcePosition: 'right',
    data: { label: 'Author' },
    position: { x: 60, y: 35 },
  },
  // default node
  {
    id: '2',
    type: 'input', // input node
    sourcePosition: 'top',
    data: { label: 'Review' },
    position: { x: 300, y: 100 },
  },
  {
    id: '3',
    type: 'input', // input node
    data: { label: 'Publish' },
    sourcePosition: 'top',
    targetPosition: 'top',
    position: { x: 550, y: 200 },
  },
  {
    id: '4',
    type: 'output', 
    data: { label: 'Live' },
    sourcePosition: 'right',
    targetPosition: 'top',
    position: { x: 800, y: 275 },
  },  
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true},
  { id: 'e3-4', source: '3', target: '4', animated: true},
];

const StandardWorkflowRenderer = () => (
  <Container>
    <div style={ style }>
      <ReactFlow 
        elements={elements} 
        connectionLineStyle= {connectionLineStyle} />
    </div>
  </Container>
);

export default StandardWorkflowRenderer;