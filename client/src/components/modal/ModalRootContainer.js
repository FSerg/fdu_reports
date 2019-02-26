import React from 'react';
import { connect } from 'react-redux';

import ModalConfirmation from './ModalConfirmation';
import ModalNotification from './ModalNotification';
import { MODAL_TYPE_CONFIRMATION, MODAL_TYPE_NOTIFICATION } from './modalTypes';

const ModalRootContainer = ({ type, props }) => {
  if (!type) {
    return null;
  }

  if (type === MODAL_TYPE_NOTIFICATION) {
    return <ModalNotification {...props} />;
  }

  if (type === MODAL_TYPE_CONFIRMATION) {
    return <ModalConfirmation {...props} />;
  }

  return null;
};

const mapStateToProps = state => {
  return {
    type: state.modal.type,
    props: state.modal.props
  };
};

export default connect(mapStateToProps)(ModalRootContainer);
