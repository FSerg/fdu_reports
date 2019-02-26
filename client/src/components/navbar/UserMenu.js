import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

const UserMenu = ({ user, signoutUser }) => {
  return (
    <Menu.Menu position="right">
      <Dropdown item simple text={user.name}>
        <Dropdown.Menu>
          <Dropdown.Item as={NavLink} to="/profile">
            Профиль
          </Dropdown.Item>
          <Dropdown.Item onClick={signoutUser}>Выход</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
};

UserMenu.propTypes = {
  signoutUser: PropTypes.func.isRequired
};

export default withRouter(UserMenu);
