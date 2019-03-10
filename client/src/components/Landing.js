import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Header, List, Grid, Button } from 'semantic-ui-react';

const Landing = ({ isAuthenticated }) => (
  <Container text style={{ padding: '8em 0em' }}>
    <Header as="h2" style={{ fontSize: '2em' }}>
      Frontol Discount Unit
    </Header>

    <p>
      Стандартный web-интерфейс{' '}
      <a
        href="https://www.frontol.ru/catalog/frontol-discount-unit/"
        target="blank"
      >
        Frontol Discount Unit
      </a>{' '}
      не имеет никаких аналитических возможностей. Поэтому возникла потребность
      сделать небольшое отдельное приложение.
    </p>

    <List bulleted>
      <List.Item>
        <b>Рейтинг карт</b> - подробный список карт упорядоченный по сумме
        оборотов по карте
      </List.Item>
      <List.Item>
        <b>Журнал чеков</b> - позволяет посмотреть продажи по картам с отбором
        по периоду и по торговым точкам
      </List.Item>
      <List.Item>
        <b>Статистика</b> - общая статистика по заполненности информации о
        клиентах. А также графики продаж, график списания и начисления бонусов и
        рейтинг торговых точек по суммам продаж.
      </List.Item>
    </List>

    <p>
      Информация nodejs-бекенд берет напрямую из базы PostgreSQL. Но для
      ограничения неавторизованных вызовов API бекенда используется проверка
      авториазции пользователя через API FDU-сервера.
    </p>

    {isAuthenticated ? (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Button as={Link} to="/report">
              Рейтинг клиентов (карт)
            </Button>
            <Button as={Link} to="/cheques">
              Журнал чеков
            </Button>
            <Button as={Link} to="/stats">
              Статистика
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
