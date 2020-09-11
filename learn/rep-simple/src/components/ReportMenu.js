import React, { useState } from 'react';
import { Menu, PageHeader } from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import UserDropdown from './UserDropdown';

const ReportMenu = (props) => {
  console.log('rendering menu now');

  const handleClick = (e) => {
    props.setSelectedMenu(e.key);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Reports Bloom"
        style={{ 'font-color': 'blue' }}
        extra={[
          <UserDropdown
            key="userDropDown"
            doLogout={props.doLogout}
            {...props}
          />,
        ]}
      ></PageHeader>

      <Menu
        onClick={handleClick}
        selectedKeys={[props.selectedMenu]}
        mode="horizontal"
      >
        <Menu.Item
          key="dashboard"
          icon={<DashboardOutlined twoToneColor="#eb2f96" />}
        >
          <a href="#/dashboard">Dashboard</a>
        </Menu.Item>
        <Menu.Item key="reportStatus" icon={<UploadOutlined />}>
          <a href="#/reportStatus">Report Status</a>
        </Menu.Item>
        <Menu.Item key="downloadReports" icon={<DownloadOutlined />}>
          <a href="#/downloadReports">Download Reports</a>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default ReportMenu;
