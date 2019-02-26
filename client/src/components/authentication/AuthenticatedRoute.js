import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from '../../actions/authActions';

import Loading from '../Loading';

class AuthenticatedRoute extends Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.getCurrentUser();
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Route {...this.props} />;
    }
    if (this.props.isLoading) {
      return <Loading />;
    }
    return <Redirect to="/login" />;
  }
}

AuthenticatedRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  getCurrentUser: PropTypes.func.isRequired
};

AuthenticatedRoute.defaultProps = {
  isAuthenticated: false
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    isLoading: state.auth.authLoading,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { getCurrentUser })(AuthenticatedRoute);
