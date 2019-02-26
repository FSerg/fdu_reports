import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ type, name, label, change }) => (
  <div className="field">
    <label>{label}</label>
    <input type={type} name={name} placeholder={label} onChange={change} />
  </div>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired
};

export default InputField;
