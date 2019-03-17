import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Table,
  Divider,
  Message,
  Loader,
  Form
} from 'semantic-ui-react';

import Config from '../Config';
import { getFraud, setFraudPeriod } from '../../actions/fraudActions';

import DatePicker from '../common/DatePicker';

class FraudPage extends Component {
  componentDidMount() {
    this.props.getFraud();
  }

  openClient = clientCode => {
    const clientUrl = `${Config.fduUrl}/#/clientcard?cid=${clientCode}&item=0`;
    window.open(clientUrl, '_blank');
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
              <DatePicker
                changeDate={this.props.setFraudPeriod}
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

        {this.props.frauds.length > 0 ? (
          <div>
            <Divider horizontal>Подозритльно активные карты</Divider>

            <Table compact="very" selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>№</Table.HeaderCell>
                  <Table.HeaderCell>Код (карта)</Table.HeaderCell>
                  <Table.HeaderCell>
                    Подозрительных дней
                    <br />
                    (больше 1 продажи в день)
                  </Table.HeaderCell>
                  <Table.HeaderCell>Всего дней</Table.HeaderCell>
                  <Table.HeaderCell>Всего продаж</Table.HeaderCell>
                  <Table.HeaderCell>Cумма</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.frauds.map((item, index) => {
                  return (
                    <Table.Row key={item.id}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>
                        <Button
                          compact
                          onClick={() => this.openClient(item.id)}
                        >
                          {item.id}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{item.baddatecounter}</Table.Cell>
                      <Table.Cell>{item.datecounter}</Table.Cell>
                      <Table.Cell>{item.chequecount}</Table.Cell>
                      <Table.Cell>
                        {new Intl.NumberFormat('ru-RU', {
                          style: 'currency',
                          currency: 'RUB'
                        }).format(item.chequetotal)}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        ) : null}
      </div>
    );
  }
}

FraudPage.propTypes = {
  getFraud: PropTypes.func.isRequired,
  setFraudPeriod: PropTypes.func.isRequired,
  frauds: PropTypes.array,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

FraudPage.defaultProps = {
  frauds: [],
  error: '',
  isLoading: false
};

const mapStateToProps = state => {
  return {
    frauds: state.fraudStore.frauds,
    period: state.fraudStore.period,
    isLoading: state.fraudStore.isLoading,
    error: state.fraudStore.error
  };
};

export default connect(
  mapStateToProps,
  { getFraud, setFraudPeriod }
)(FraudPage);
