import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';

import { hideModal } from '../../actions/modalActions';
import ModalCommon from './ModalCommon';

const ModalConfirmation = ({ title, content, onConfirm, hideModal }) => {
  const handleConfirm = isConfirmed => () => {
    hideModal();
    onConfirm(isConfirmed);
  };

  return (
    <ModalCommon title={title} content={content}>
      <Modal.Actions>
        <Button positive onClick={handleConfirm(true)}>
          Да
        </Button>
        <Button negative onClick={handleConfirm(false)}>
          Нет
        </Button>
      </Modal.Actions>
    </ModalCommon>
  );
};

export default connect(null, { hideModal })(ModalConfirmation);
