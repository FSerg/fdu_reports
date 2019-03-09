import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Header, Button } from 'semantic-ui-react';

const Landing = ({ isAuthenticated }) => (
  <Container text textAlign="center" style={{ padding: '8em 0em' }}>
    <Header as="h3" style={{ fontSize: '3em' }}>
      Frontol Discount Unit
    </Header>

    <p style={{ fontSize: '1.5em', fontWeight: 'normal' }}>
      Модуль получения рейтинга киентов по сумме продаж и текущим накоплениям
      бонусов.
    </p>

    {/* <Grid>
      <Grid.Row columns={1}>
        <Grid.Column>

          <Button primary size="huge" as={Link} to="/report">
            Рейтинг клиентов (карт)
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid> */}
    {isAuthenticated ? (
      <Button primary size="huge" as={Link} to="/report">
        Рейтинг клиентов (карт)
      </Button>
    ) : (
      <Button primary size="huge" as={Link} to="/login">
        Войти в систему
      </Button>
    )}
  </Container>
);

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

Landing.defaultProps = {
  isAuthenticated: false
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Landing);
