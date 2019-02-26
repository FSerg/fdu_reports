import React from 'react';
import PropTypes from 'prop-types';

const FieldMessage = ({ content, type }) => (
  <span style={{ color: type === 'error' ? '#9f3a38' : '#6597a7' }}>
    {content}
  </span>
);

FieldMessage.propTypes = {
  content: PropTypes.string,
  type: PropTypes.oneOf(['error', 'info']).isRequired
};

FieldMessage.defaultProps = {
  content: ''
};

export default FieldMessage;
