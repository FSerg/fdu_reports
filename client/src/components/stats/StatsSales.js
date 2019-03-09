import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';

import {
  Divider,
  Header,
  Message,
  Form,
  Dropdown,
  Segment
} from 'semantic-ui-react';

import {
  getSales1Stats,
  getSales2Stats,
  getSales3Stats,
  setStatsPeriod,
  getPosAccounts,
  setCurrentPosAccounts
} from '../../actions/salesActions';

import DatePicker from '../common/DatePicker';

class StatsSales extends Component {
  componentDidMount() {
    this.props.getSales1Stats();
    this.props.getSales2Stats();
    this.props.getSales3Stats();
    this.props.getPosAccounts();
  }

  handlePosSelected = (e, data) => {
    console.log(data);
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
        {this.props.error1 ? (
          <Message negative>
            <Message.Header>Что-то пошло не так!</Message.Header>
            <p>{this.props.error}</p>
          </Message>
        ) : null}

        <Segment>
          <Header as="h3">Статистика продаж</Header>
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
                  changeDate={this.props.setStatsPeriod}
                  currentDates={this.getCurrentDates()}
                />
              </Form.Field>
            </Form.Group>
          </Form>

          <Divider horizontal>
            Сумма продаж (по выбранным точкам) за период
          </Divider>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={this.props.sales1}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dategroup"
                angle={-33}
                interval={0}
                textAnchor="end"
                height={65}
                style={{ fontFamily: 'Arial', fontSize: 12 }}
              />
              <YAxis style={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar name="Сумма продаж" dataKey="chequetotal" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

          <Divider horizontal>
            Списания/начисления бонусов (по всем точкам) за период
          </Divider>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={this.props.sales2}
              stackOffset="sign"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="dategroup"
                angle={-33}
                interval={0}
                textAnchor="end"
                height={65}
                style={{ fontFamily: 'Arial', fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar
                name="Начислено бонусов"
                dataKey="added"
                fill="#82ca9d"
                stackId="stack"
              />
              <Bar
                name="Списано бонусов"
                dataKey="deducted"
                fill="#8884d8"
                stackId="stack"
              />
            </BarChart>
          </ResponsiveContainer>

          <Divider horizontal>Рейтинг торговых точек за период</Divider>
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              data={this.props.sales3}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                width={150}
                type="category"
                dataKey="posname"
                style={{ fontFamily: 'Arial', fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Bar
                name="Сумма продаж"
                dataKey="chequetotal"
                fill="#82ca9d"
                label={{ position: 'right' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Segment>
      </div>
    );
  }
}

StatsSales.propTypes = {
  getSales1Stats: PropTypes.func.isRequired,
  getSales2Stats: PropTypes.func.isRequired,
  getSales3Stats: PropTypes.func.isRequired,
  setStatsPeriod: PropTypes.func.isRequired,
  getPosAccounts: PropTypes.func.isRequired,
  setCurrentPosAccounts: PropTypes.func.isRequired,
  sales1: PropTypes.array,
  sales2: PropTypes.array,
  sales3: PropTypes.array,
  error1: PropTypes.string,
  error2: PropTypes.string,
  error3: PropTypes.string,
  pos_accounts: PropTypes.array
};

StatsSales.defaultProps = {
  sales1: [],
  sales2: [],
  sales3: [],
  error1: '',
  error2: '',
  error3: '',
  pos_accounts: []
};

const mapStateToProps = state => {
  return {
    sales1: state.salesStore.sales1,
    sales2: state.salesStore.sales2,
    sales3: state.salesStore.sales3,
    error1: state.salesStore.error1,
    error2: state.salesStore.error2,
    error3: state.salesStore.error3,
    pos_accounts: state.salesStore.pos_accounts,
    period: state.salesStore.period,
    current_accounts: state.salesStore.current_accounts
  };
};

export default connect(
  mapStateToProps,
  {
    getSales1Stats,
    getSales2Stats,
    getSales3Stats,
    setStatsPeriod,
    getPosAccounts,
    setCurrentPosAccounts
  }
)(StatsSales);
