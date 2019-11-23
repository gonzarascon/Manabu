import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { Heading, Text, Anchor } from 'grommet';

import Emoji from '../../helpers/emoji';
import { Wrapper } from './styles';

function FinishedLayout() {
  return (
    <Wrapper alignContent="center" justify="center">
      <Heading
        textAlign="center"
        margin={{ vertical: '0', horizontal: 'auto' }}
      >
        <Emoji label="Felicidades" symbol="🎉" />
        <Emoji label="Curso completo" symbol="🐲" />
        <Emoji label="Felicidades" symbol="🎉" />
      </Heading>
      <Heading
        level={2}
        textAlign="center"
        margin={{ vertical: '0', horizontal: 'auto' }}
        color="gray1"
      >
        ¡Felicitaciones has completado el curso!
      </Heading>
      <Text margin={{ vertical: '0', horizontal: 'auto' }}>
        Continúa con tu aprendizaje buscando nuevos cursos perfectos para ti.
      </Text>
      <Anchor margin={{ vertical: '0', horizontal: 'auto' }} href="/">
        o también, puedes volver al inicio.
      </Anchor>
    </Wrapper>
  );
}

export default FinishedLayout;
