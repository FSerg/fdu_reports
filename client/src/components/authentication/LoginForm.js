import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Header,
  Segment,
  Message,
  Form,
  Button
} from 'semantic-ui-react';

import InputField from '../forms/InputField';
import FieldMessage from '../forms/FieldMessage';

class LoginForm extends Component {
  state = {
    data: {
      name: '',
      password: ''
    },
    errors: {}
  };

  validate = data => {
    const errors = {};
    if (!data.name) {
      errors.name = 'Имя пользователя не может быть пустым';
    }

    if (!data.password) {
      errors.password = 'Пароль не может быть пустым';
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
  };

  handleStringChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { errors, isValid } = this.validate(this.state.data);
    this.setState({ errors });
    if (isValid) {
      this.props.submit(this.state.data);
    }
  };

  showError = errorMessage => {
    if (errorMessage) {
      return <Message negative>{errorMessage}</Message>;
    }
    return <div />;
  };

  render() {
    const { errors, data } = this.state;

    return (
      <Grid
        centered
        style={{ height: '100%', paddingTop: '5em' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Header as="h3" block textAlign="center">
              Вход в систему
            </Header>
            <Form loading={this.props.authLoading} onSubmit={this.handleSubmit}>
              <Form.Field error={errors.name}>
                <InputField
                  type="text"
                  name="name"
                  label="Имя пользователя"
                  value={data.name}
                  change={this.handleStringChange}
                />
                <FieldMessage content={errors.name} type="error" />
              </Form.Field>

              <Form.Field error={errors.password}>
                <InputField
                  type="password"
                  name="password"
                  label="Пароль"
                  value={data.password}
                  change={this.handleStringChange}
                />
                <FieldMessage content={errors.password} type="error" />
              </Form.Field>

              {this.showError(this.props.authError)}

              <Button color="teal" fluid size="large">
                Войти
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  authError: PropTypes.string,
  authLoading: PropTypes.bool
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

LoginForm.defaultProps = {
  authError: '',
  authLoading: false
};

export default LoginForm;
