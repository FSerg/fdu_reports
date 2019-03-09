import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Table, Divider, Message, Loader } from 'semantic-ui-react';
import dayjs from 'dayjs';

import Config from '../Config';
import {
  getReportNextPage,
  getReportPrevPage,
  getReportFirstPage,
  setReportType
} from '../../actions/reportsActions';

import NavButtons from '../common/NavButtons';

class ReportPage extends Component {
  clickReport = reportType => {
    this.props.setReportType(reportType);
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

        {this.props.error ? (
          <Message negative>
            <Message.Header>Что-то пошло не так!</Message.Header>
            <p>{this.props.error}</p>
          </Message>
        ) : null}

        {this.props.isLoading ? (
          <Loader
            active
            size="large"
            inline="centered"
            style={{ marginTop: '5em', marginBottom: '5em' }}
          />
        ) : null}

        {this.props.items.length > 0 ? (
          <div>
            <Divider horizontal>Рейтинг клиентов (карт)</Divider>
            <NavButtons
              NextPage={this.props.getReportNextPage}
              PrevPage={this.props.getReportPrevPage}
              FirstPage={this.props.getReportFirstPage}
              page={this.props.page}
            />
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
                        <Button
                          compact
                          onClick={() => this.openClient(item.id)}
                        >
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

            <NavButtons
              NextPage={this.props.getReportNextPage}
              PrevPage={this.props.getReportPrevPage}
              FirstPage={this.props.getReportFirstPage}
              page={this.props.page}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ReportPage.propTypes = {
  getReportNextPage: PropTypes.func.isRequired,
  getReportPrevPage: PropTypes.func.isRequired,
  getReportFirstPage: PropTypes.func.isRequired,
  setReportType: PropTypes.func.isRequired,
  items: PropTypes.array,
  page: PropTypes.number,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

ReportPage.defaultProps = {
  items: [],
  page: 1,
  error: '',
  isLoading: false
};

const mapStateToProps = state => {
  return {
    items: state.reportsStore.items,
    page: state.reportsStore.page,
    isLoading: state.reportsStore.isLoading,
    error: state.reportsStore.error
  };
};

export default connect(
  mapStateToProps,
  { getReportNextPage, getReportPrevPage, getReportFirstPage, setReportType }
)(ReportPage);
