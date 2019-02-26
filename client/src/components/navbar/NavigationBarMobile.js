import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container,
  Menu,
  Label,
  Button,
  Icon,
  Statistic,
  Dropdown
} from 'semantic-ui-react';

import { signoutUser } from '../../actions/authActions';
import UserMenu from './UserMenu';

const trigger = <Icon style={{ paddingLeft: '5px' }} name="bars" size="big" />;

class NavigationBarMobile extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <Menu>
        <Container>
          <Menu.Item as={NavLink} exact to="/">
            <Statistic
              size="mini"
              color="grey"
              style={{ paddingLeft: '5px', paddingRight: '5px' }}
            >
              <Statistic.Label>Аптеки Альфа</Statistic.Label>
              <Statistic.Value>8 (86133) 49-333</Statistic.Value>
            </Statistic>
          </Menu.Item>

          <Menu.Item as={NavLink} to="/history">
            <Button primary>Поиск</Button>
          </Menu.Item>

          <Menu.Menu position="right">
            <Dropdown trigger={trigger} item simple>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/drugstores">
                  Адреса аптек
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/discounts">
                  Бонусная программа
                </Dropdown.Item>

                {!authenticated
                  ? [
                    <Dropdown.Item as={NavLink} to="/login">
                        Вход всистему
                    </Dropdown.Item>,
                    <Dropdown.Item as={NavLink} to="/signup">
                        Регистрация
                    </Dropdown.Item>
                  ]
                  : [
                    <Dropdown.Item as={NavLink} to="/profile">
                        Профиль
                    </Dropdown.Item>,
                    <Dropdown.Item onClick={signoutUser}>Выход</Dropdown.Item>
                  ]}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

NavigationBarMobile.propTypes = {
  signoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
};

NavigationBarMobile.defaultProps = {
  authenticated: false
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { signoutUser }
  )(NavigationBarMobile)
);
