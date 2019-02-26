import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { loginSubmit } from '../../actions/authActions';

import LoginForm from './LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm
          submit={this.props.loginSubmit}
          authError={this.props.authError}
          authLoading={this.props.authLoading}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginSubmit: PropTypes.func.isRequired,
  authError: PropTypes.string,
  authLoading: PropTypes.bool
};

LoginPage.defaultProps = {
  authError: '',
  authLoading: false
};

const mapStateToProps = state => {
  return {
    authError: state.auth.error,
    authLoading: state.auth.authLoading
  };
};

export default connect(
  mapStateToProps,
  { loginSubmit }
)(LoginPage);
