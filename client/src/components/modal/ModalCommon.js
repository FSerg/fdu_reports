import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'semantic-ui-react';

class ModalCommon extends Component {
  getTitle() {
    const { title } = this.props;
    return title ? <Modal.Header>{title}</Modal.Header> : null;
  }

  getContent() {
    const { content } = this.props;
    return content ? <Modal.Content>{content}</Modal.Content> : null;
  }

  render() {
    const inlineStyle = {
      modal: {
        //marginTop: '100px !important',
        marginTop: '200px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    return (
      <Modal
        size="mini"
        open
        style={inlineStyle.modal}
        onClose={this.props.onClose}
      >
        {this.getTitle()}
        {this.getContent()}
        {this.props.children}
      </Modal>
    );
  }
}

ModalCommon.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func
};

export default ModalCommon;
