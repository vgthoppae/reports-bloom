import React, { useLayoutEffect, useState } from 'react';
import { Menu, PageHeader } from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import UserDropdown from './UserDropdown';

const ReportMenu = (props) => {
  const [current, setCurrent] = useState('dashboard');

  if (props.isLoggedIn === undefined) return null;

  console.log('rendering menu now');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Reports Bloom"
        extra={[<UserDropdown key="userDropDown" />]}
      ></PageHeader>

      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item
          key="dashboard"
          icon={<DashboardOutlined twoToneColor="#eb2f96" />}
        >
          <a href="#/dashboard">Dashboard</a>
        </Menu.Item>
        <Menu.Item key="upload" icon={<UploadOutlined />}>
          <a href="#/reportStatus">Report Status</a>
        </Menu.Item>
        <Menu.Item key="download" icon={<DownloadOutlined />}>
          <a href="#/downloadReports">Download Reports</a>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default ReportMenu;
