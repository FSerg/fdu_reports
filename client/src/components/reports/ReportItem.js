import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Label } from 'semantic-ui-react';
import { getDateStr, getShortDateStr } from '../../utils/Utils';

class ClientItem extends Component {
  renderDebts = Debt => {
    if (Debt === 0) {
      return null;
    }
    if (Debt > 0) {
      return (
        <Label style={{ float: 'right' }} size="big" color="green">
          Долг: {Debt} р.
        </Label>
      );
    }
    return (
      <Label style={{ float: 'right' }} size="big" color="red">
        Долг: {Debt} р.
      </Label>
    );
  };

  renderBlocked = Blocked => {
    if (Blocked) {
      return (
        <Label style={{ float: 'right' }} size="big" color="black">
          Черный список!
        </Label>
      );
    }
  };

  renderInfo = (Info, Size = 'large') => {
    if (!Info) {
      return null;
    }
    return <Label size={Size}>{Info}</Label>;
  };

  renderBirthDay = (BirthDay, Age) => {
    if (!BirthDay) {
      return null;
    }
    return (
      <Label size="large">
        {getShortDateStr(BirthDay)} (Возраст: {Age})
      </Label>
    );
  };

  render() {
    const {
      Code,
      FullName,
      BirthDay,
      Address,
      Phone,
      Email,
      Passport,
      Debt,
      Blocked,
      CreatedAt,
      CreatedBy,
      Age
    } = this.props.item;

    return (
      <Card
        fluid
        key={Code}
        as={Link}
        // to={Code}
        to={`/history/${Code}`}
        color={Blocked ? 'red' : 'green'}
      >
        <Card.Content>
          <Card.Header>
            {FullName}
            {this.renderDebts(Debt)}
            {this.renderBlocked(Blocked)}
          </Card.Header>
          <Card.Meta>
            [{Code}] Зарегистрирован: {getDateStr(CreatedAt)} / Автор:{' '}
            {CreatedBy}
          </Card.Meta>
          <Card.Description>
            {this.renderBirthDay(BirthDay, Age)}
            {this.renderInfo(Phone)}
            {this.renderInfo(Email)}
            {this.renderInfo(Address)}
            {Passport ? <div>{Passport}</div> : null}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default ClientItem;
