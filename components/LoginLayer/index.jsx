import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {
  Layer,
  Box,
  Heading,
  Text,
  Form,
  FormField,
  Button,
  Anchor
} from 'grommet';
import { calculateRem } from 'constants';
import Emoji from '../../helpers/emoji';

const LoginLayer = ({ closeHandler, submitFormHandler }) => (
  <Layer modal onClickOutside={closeHandler} onEsc={closeHandler}>
    <Box
      direction="column"
      pad="medium"
      width="400px"
      height="60vh"
      justify="evenly"
    >
      <Box>
        <Text size={calculateRem(30)} textAlign="center" margin="small">
          <Emoji label="Greetings" symbol="😊" />
        </Text>
        <Heading level={4} sans textAlign="center" size={calculateRem('25')}>
          ¡Que bueno que estes aquí!
        </Heading>
      </Box>

      <Form onSubmit={({ value }) => submitFormHandler(value)}>
        <Box maxWidth="300px" margin="auto">
          <FormField
            label={
              <Text textAlign="center" as="span" dsp="block">
                Nombre de usuario
              </Text>
            }
            name="username"
            placeholder="Ingresa tu usuario"
          />
        </Box>

        <Box
          maxWidth="300px"
          margin={{ horizontal: 'auto', vertical: 'small' }}
        >
          <FormField
            label={
              <Text textAlign="center" as="span" dsp="block">
                Contraseña
              </Text>
            }
            name="password"
            type="password"
            placeholder="Ingresa tu contraseña"
          />
        </Box>

        <Button
          filled
          type="submit"
          label="Iniciar Sesion"
          margin="auto"
          dsp="block"
        />
      </Form>
      <Link href="/sign_up">
        <Anchor label="¿Eres nuevo? ¡Crea una cuenta!" alignSelf="center" />
      </Link>
    </Box>
  </Layer>
);

LoginLayer.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  submitFormHandler: PropTypes.func.isRequired
};

export default LoginLayer;
