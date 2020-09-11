import React from 'react';
import { Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserDropdown = (props) => {
  const handleClick = (e) => {
    props.doLogout();
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <a href="/#/logout" onClick={handleClick}>
          Sign Out
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown.Button
        style={{ float: 'right' }}
        className="dropdown-btn"
        overlay={userMenu}
        icon={
          <UserOutlined
            style={{
              fontSize: '22px',
              backgroundColor: '#f0f0f0',
              borderRadius: '50%',
            }}
          />
        }
      ></Dropdown.Button>
    </div>
  );
};

export default UserDropdown;
