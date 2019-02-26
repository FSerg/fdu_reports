import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu, Button } from 'semantic-ui-react';

import { signoutUser } from '../../actions/authActions';
import UserMenu from './UserMenu';

class NavigationBar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <Menu fixed="top">
        <Container>
          <Menu.Item as={NavLink} to="/report">
            <Button primary>Рейтинг клиентов (карт)</Button>
          </Menu.Item>

          {!authenticated ? (
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/login">
                Вход в систему
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <UserMenu
              user={this.props.user}
              signoutUser={this.props.signoutUser}
            />
          )}
        </Container>
      </Menu>
    );
  }
}

NavigationBar.propTypes = {
  signoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
};

NavigationBar.defaultProps = {
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
  )(NavigationBar)
);
