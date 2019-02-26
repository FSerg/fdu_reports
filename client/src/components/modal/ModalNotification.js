import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';

import { hideModal } from '../../actions/modalActions';
import ModalCommon from './ModalCommon';

const ModalNotification = ({ title, content, afterClose, hideModal }) => {
  const onClose = () => {
    hideModal();

    if (afterClose) {
      afterClose();
    }
  };

  return (
    <ModalCommon title={title} content={content} onClose={onClose}>
      <Modal.Actions>
        <Button positive onClick={onClose}>
          OK
        </Button>
      </Modal.Actions>
    </ModalCommon>
  );
};

export default connect(null, { hideModal })(ModalNotification);
