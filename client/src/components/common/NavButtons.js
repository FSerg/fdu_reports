import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const NavButtons = ({ PrevPage, NextPage, FirstPage, page }) => {
  //   const handleConfirm = isConfirmed => () => {
  //     hideModal();
  //     onConfirm(isConfirmed);
  //   };
  const isDisabled = page > 1 ? false : true;

  return (
    <div>
      <Button
        size="mini"
        content="Назад"
        icon="left arrow"
        labelPosition="left"
        onClick={() => PrevPage()}
      />
      <Button
        size="mini"
        disabled={isDisabled}
        content="Вперед"
        icon="right arrow"
        labelPosition="right"
        onClick={() => NextPage()}
      />
      <Button
        size="mini"
        disabled={isDisabled}
        content="В начало"
        icon="fast forward"
        labelPosition="right"
        onClick={() => FirstPage()}
      />
    </div>
  );
};

NavButtons.propTypes = {
  PrevPage: PropTypes.func.isRequired,
  NextPage: PropTypes.func.isRequired,
  FirstPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired
};

export default NavButtons;
