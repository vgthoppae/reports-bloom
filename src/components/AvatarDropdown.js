import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserOutlined } from '@ant-design/icons';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const AvatarMenu = () => {
  const [value, setValue] = useState('');

  const AvatarToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const AvatarDropdown = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <Dropdown>
      <Dropdown.Toggle as={AvatarToggle} id="dropdown-custom-components">
        <UserOutlined
          style={{
            fontSize: '22px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
          }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu as={AvatarDropdown}>
        <Dropdown.Item eventKey="1">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AvatarMenu;
