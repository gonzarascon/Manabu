import React from 'react';
import { Heading, Text, Anchor } from 'grommet';

import Emoji from '../../helpers/emoji';
import { Wrapper } from './styles';

function ErrorLayout() {
  return (
    <Wrapper alignContent="center" justify="center">
      <Heading
        textAlign="center"
        margin={{ vertical: '0', horizontal: 'auto' }}
      >
        <Emoji label="Error" symbol="😥" />
      </Heading>
      <Heading
        level={2}
        textAlign="center"
        margin={{ vertical: '0', horizontal: 'auto' }}
        color="gray1"
      >
        ¡Ups!
      </Heading>
      <Text margin={{ vertical: '0', horizontal: 'auto' }}>
        No pudimos encontrar lo que estas buscando.
      </Text>
      <Anchor
        margin={{ vertical: '0', horizontal: 'auto' }}
        href="/"
        size="medium"
      >
        Regresa al inicio para continuar aprendiendo.
      </Anchor>
    </Wrapper>
  );
}

export default ErrorLayout;
