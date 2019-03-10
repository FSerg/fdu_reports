import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Divider,
  Grid,
  Header,
  Statistic,
  Message,
  Loader,
  Segment
} from 'semantic-ui-react';

import { getCardsStats } from '../../actions/statsActions';

import SmallTable from './SmallTable';

class StatsCards extends Component {
  componentDidMount() {
    this.props.getCardsStats();
  }

  render() {
    return (
      <div>
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

        <Segment>
          <Header as="h3">Общая статистика по картам</Header>

          <Grid columns="equal">
            <Grid.Column>
              <Statistic.Group size="small">
                <Statistic>
                  <Statistic.Label>Всего карт</Statistic.Label>
                  <Statistic.Value>
                    {this.props.totalsStats.totalCards}
                  </Statistic.Value>
                </Statistic>
                <Statistic>
                  <Statistic.Label>Заполнено имя</Statistic.Label>
                  <Statistic.Value>
                    {this.props.totalsStats.namedCards}
                  </Statistic.Value>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
            <Grid.Column>
              <SmallTable
                tableHeader="Заполнено имя"
                tableRows={this.props.stats.namesStats}
              />
            </Grid.Column>
            <Grid.Column>
              <SmallTable
                tableHeader="Указан пол"
                tableRows={this.props.stats.sexStats}
              />
            </Grid.Column>
          </Grid>
          <Divider horizontal>Данные по картам с заполненным именем</Divider>
          <Grid columns="equal">
            <Grid.Column>
              <SmallTable
                tableHeader="Указан телефон"
                tableRows={this.props.stats.phonesStats}
              />
            </Grid.Column>
            <Grid.Column>
              <SmallTable
                tableHeader="Указана дата рождения"
                tableRows={this.props.stats.birthdaysStats}
              />
            </Grid.Column>
            <Grid.Column>
              <SmallTable
                tableHeader="Разрешены СМС"
                tableRows={this.props.stats.smsEnabled}
              />
            </Grid.Column>
            <Grid.Column>
              <SmallTable
                tableHeader="Разрешена эл.почта"
                tableRows={this.props.stats.emailsEnabled}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    );
  }
}

StatsCards.propTypes = {
  getCardsStats: PropTypes.func.isRequired,
  totalsStats: PropTypes.object,
  stats: PropTypes.object,
  pos_accounts: PropTypes.array,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

StatsCards.defaultProps = {
  error: '',
  isLoading: false
};

const mapStateToProps = state => {
  return {
    totalsStats: state.statsStore.totalsStats,
    stats: state.statsStore.stats,
    isLoading: state.statsStore.isLoading,
    error: state.statsStore.error
  };
};

export default connect(
  mapStateToProps,
  { getCardsStats }
)(StatsCards);
