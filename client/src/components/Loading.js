import React from 'react';
import { Container, Loader } from 'semantic-ui-react';

const Loading = () => (
  <Container>
    <Loader
      active
      size="large"
      inline="centered"
      style={{ marginTop: '10em', marginBottom: '5em' }}
    />
  </Container>
);

export default Loading;
