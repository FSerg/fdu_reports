import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const SmallTable = ({ tableHeader, tableRows }) => {
  const rowType = row => {
    if (row.title === 'Да') {
      return 'positive';
    }
    if (row.title === 'Нет') {
      return 'negative';
    }
    return '';
  };

  return (
    <Table compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">{tableHeader}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableRows.map((row, i) => {
          return (
            <Table.Row className={rowType(row)} key={i}>
              <Table.Cell>{row.title}</Table.Cell>
              <Table.Cell>
                {row.count} ({row.percent})
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

SmallTable.propTypes = {
  tableHeader: PropTypes.string.isRequired,
  tableRows: PropTypes.array.isRequired
};

export default SmallTable;
