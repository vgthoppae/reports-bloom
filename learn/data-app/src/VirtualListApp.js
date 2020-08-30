import React from 'react';
import faker from 'faker';
// import List from './List';
import { FixedSizeList } from 'react-window';

const bigList = [...Array(1000)].map(() => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.internet.avatar(),
}));

export default function VirtualListApp() {
  const renderRow = ({ index, style }) => (
    <div style={{ ...style, ...{ display: 'flex' } }}>
      <img
        src={bigList[index].avatar}
        alt={bigList[index].name}
        style={{ width: 50 }}
      />
      {bigList[index].name}-{bigList[index].email}
    </div>
  );
  return (
    <FixedSizeList
      height={window.innerHeight}
      width={window.innerWidth}
      itemCount={bigList.length}
      itemSize={50}
    >
      {renderRow}
    </FixedSizeList>
  );
}
