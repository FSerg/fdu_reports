import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Divider, Message, Loader } from 'semantic-ui-react';
import dayjs from 'dayjs';

import Config from '../Config';
import { getReport } from '../../actions/reportsActions';
// import ClientItem from './ClientItem';

class ReportPage extends Component {
  clickReport = reportType => {
    this.props.getReport(reportType);
  };

  openClient = clientCode => {
    const clientUrl = `${Config.fduUrl}/#/clientcard?cid=${clientCode}&item=0`;
    window.open(clientUrl, '_blank');
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.clickReport('total')}>
          По общей сумме
        </Button>
        <Button onClick={() => this.clickReport('bonus')}>
          По текущим бонусам
        </Button>

        <Divider horizontal>Рейтинг клиентов (карт)</Divider>

        {this.props.error ? (
          <Message negative>
            <Message.Header>Что-то пошло не так!</Message.Header>
            <p>{this.props.error}</p>
          </Message>
        ) : (
          <div />
        )}

        {this.props.isLoading ? (
          <Loader
            active
            size="large"
            inline="centered"
            style={{ marginTop: '5em', marginBottom: '5em' }}
          />
        ) : (
          <Table compact="very" selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>№</Table.HeaderCell>
                <Table.HeaderCell>Код (карта)</Table.HeaderCell>
                <Table.HeaderCell>Имя</Table.HeaderCell>
                <Table.HeaderCell>Телефон</Table.HeaderCell>
                <Table.HeaderCell>Дата рождения</Table.HeaderCell>
                <Table.HeaderCell>Общая сумма</Table.HeaderCell>
                <Table.HeaderCell>Текущий бонусы</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.items.map(item => {
                return (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.index}</Table.Cell>
                    <Table.Cell>
                      <Button compact onClick={() => this.openClient(item.id)}>
                        {item.id}
                      </Button>
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.phone}</Table.Cell>
                    <Table.Cell>
                      {dayjs(item.birthday).format('DD-MM-YYYY')}
                    </Table.Cell>
                    <Table.Cell>
                      {new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB'
                      }).format(item.total)}
                    </Table.Cell>
                    <Table.Cell>
                      {new Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB'
                      }).format(item.bonus)}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        )}
        <Divider horizontal>***</Divider>
      </div>
    );
  }
}

ReportPage.propTypes = {
  getReport: PropTypes.func.isRequired,
  items: PropTypes.array,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

ReportPage.defaultProps = {
  items: [],
  error: '',
  isLoading: false
};

const mapStateToProps = state => {
  return {
    items: state.reportsStore.items,
    isLoading: state.reportsStore.isLoading,
    error: state.reportsStore.error
  };
};

export default connect(
  mapStateToProps,
  { getReport }
)(ReportPage);
