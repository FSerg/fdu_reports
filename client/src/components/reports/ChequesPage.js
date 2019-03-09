import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Table,
  Divider,
  Message,
  Loader,
  Form,
  Dropdown
} from 'semantic-ui-react';
import dayjs from 'dayjs';

import Config from '../Config';
import {
  getCheques,
  setChequesPeriod,
  getChequesNextPage,
  getChequesPrevPage,
  getChequesFirstPage,
  getPosAccounts,
  setCurrentPosAccounts
} from '../../actions/chequesActions';

import NavButtons from '../common/NavButtons';
import DatePicker from '../common/DatePicker';

class ChequesPage extends Component {
  componentDidMount() {
    this.props.getCheques();
    this.props.getPosAccounts();
  }

  clickReport = reportType => {
    this.props.setReportType(reportType);
  };

  openClient = clientCode => {
    const clientUrl = `${Config.fduUrl}/#/clientcard?cid=${clientCode}&item=0`;
    window.open(clientUrl, '_blank');
  };

  handlePosSelected = (e, data) => {
    this.props.setCurrentPosAccounts(data.value);
  };

  getCurrentDates = () => {
    let datesArray = [];
    if (this.props.period.date1 && this.props.period.date2) {
      datesArray.push(this.props.period.date1);
      datesArray.push(this.props.period.date2);
    }
    return datesArray;
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Dropdown
                selection
                multiple
                closeOnChange
                name="poses"
                options={this.props.pos_accounts}
                placeholder="Выберите кассу"
                onChange={this.handlePosSelected}
                value={this.props.current_accounts}
              />
            </Form.Field>
            <Form.Field>
              <DatePicker
                changeDate={this.props.setChequesPeriod}
                currentDates={this.getCurrentDates()}
              />
            </Form.Field>
          </Form.Group>
        </Form>

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

        {this.props.cheques.length > 0 ? (
          <div>
            <Divider horizontal>Журнал чеков</Divider>
            <NavButtons
              NextPage={this.props.getChequesNextPage}
              PrevPage={this.props.getChequesPrevPage}
              FirstPage={this.props.getChequesFirstPage}
              page={this.props.page}
            />
            <Table compact="very" selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>№</Table.HeaderCell>
                  <Table.HeaderCell>Код (карта)</Table.HeaderCell>
                  <Table.HeaderCell>Чек</Table.HeaderCell>
                  <Table.HeaderCell>Дата/время</Table.HeaderCell>
                  <Table.HeaderCell>Cумма</Table.HeaderCell>
                  <Table.HeaderCell>Касса</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.cheques.map(item => {
                  return (
                    <Table.Row key={item.uid}>
                      <Table.Cell>{item.index}</Table.Cell>
                      <Table.Cell>
                        <Button
                          compact
                          onClick={() => this.openClient(item.id)}
                        >
                          {item.id}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        {item.type === 'sale' ? 'Продажа ' : 'Возврат '} №
                        {item.number}
                      </Table.Cell>
                      <Table.Cell>
                        {dayjs(item.stamp).format('DD-MM-YYYY HH:mm:ss')}
                      </Table.Cell>
                      <Table.Cell>
                        {new Intl.NumberFormat('ru-RU', {
                          style: 'currency',
                          currency: 'RUB'
                        }).format(item.total)}
                      </Table.Cell>
                      <Table.Cell>
                        {item.pos} - {item.pos_name}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <NavButtons
              NextPage={this.props.getChequesNextPage}
              PrevPage={this.props.getChequesPrevPage}
              FirstPage={this.props.getChequesFirstPage}
              page={this.props.page}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ChequesPage.propTypes = {
  getCheques: PropTypes.func.isRequired,
  setChequesPeriod: PropTypes.func.isRequired,
  getChequesNextPage: PropTypes.func.isRequired,
  getChequesPrevPage: PropTypes.func.isRequired,
  getChequesFirstPage: PropTypes.func.isRequired,
  getPosAccounts: PropTypes.func.isRequired,
  setCurrentPosAccounts: PropTypes.func.isRequired,
  cheques: PropTypes.array,
  pos_accounts: PropTypes.array,
  page: PropTypes.number,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

ChequesPage.defaultProps = {
  cheques: [],
  pos_accounts: [],
  page: 1,
  error: '',
  isLoading: false
};

const mapStateToProps = state => {
  return {
    cheques: state.chequesStore.cheques,
    pos_accounts: state.chequesStore.pos_accounts,
    page: state.chequesStore.page,
    period: state.chequesStore.period,
    current_accounts: state.chequesStore.current_accounts,
    isLoading: state.chequesStore.isLoading,
    error: state.chequesStore.error
  };
};

export default connect(
  mapStateToProps,
  {
    getCheques,
    setChequesPeriod,
    getChequesNextPage,
    getChequesPrevPage,
    getChequesFirstPage,
    getPosAccounts,
    setCurrentPosAccounts
  }
)(ChequesPage);
