import React from 'react';
import PropTypes from 'prop-types';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import ruLocale from 'react-semantic-ui-datepickers/dist/locales/ru-RU';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

const DatePicker = ({ changeDate }) => {
  const handleConfirm = dates => {
    // console.log(dates);
    if (!dates) {
      const period = { date1: '', date2: '' };
      changeDate(period);
    }

    if (dates && dates.length > 1) {
      const period = { date1: dates[0], date2: dates[1] };
      changeDate(period);
    }
  };

  return (
    <SemanticDatepicker
      locale={ruLocale}
      placeholder="Выберите период"
      onDateChange={handleConfirm}
      type="range"
      id="x123"
    />
  );
};

DatePicker.propTypes = {
  changeDate: PropTypes.func.isRequired
};

export default DatePicker;
