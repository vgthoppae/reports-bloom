import React from 'react';
import 'antd/dist/antd.css';
import { Input, AutoComplete } from 'antd';

const renderItem = (item) => ({
  value: item,
  label: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {item}
    </div>
  ),
});

const options = [
  {
    options: [
      renderItem('Tasks Completed This period'),
      renderItem('Key Deliverables This period'),
      renderItem('Tasks Planned Next Period'),
      renderItem('Scheduled Time Off'),
    ],
  },
];

const StatusKeyDropdown = () => (
  <AutoComplete
    dropdownMatchSelectWidth={250}
    style={{
      width: 250,
    }}
    options={options}
  >
    <Input size="large" placeholder="Select or Input here" />
  </AutoComplete>
);

export default StatusKeyDropdown;
