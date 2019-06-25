import React from 'react';
import {
  Layer,
  Box,
  Heading,
  Form,
  FormField,
  TextInput,
  Button,
} from 'grommet';

const LoginLayer = ({ closeHandler, submitFormHandler }) => (
  <Layer modal onClickOutside={closeHandler} onEsc={closeHandler}>
    <Box direction="column" pad="medium">
      <Heading level={4} sans>
        ¡Que bueno que estes aquí!
      </Heading>
      <Form onSubmit={submitFormHandler}>
        <FormField label="Nombre de usuario" name="username">
          <TextInput placeholder="Ingresa tu nombre de usuario" />
        </FormField>
        <FormField label="Contraseña" name="password">
          <TextInput placeholder="Ingresa tu contraseña" />
        </FormField>
        <Button primary type="submit" label="Iniciar Sesion" />
      </Form>
    </Box>
  </Layer>
);

export default LoginLayer;
