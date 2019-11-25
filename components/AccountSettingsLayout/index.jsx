import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import validator from 'validator';
import _ from 'lodash';
import { Box, Heading, Form, FormField, Text, Select, Button } from 'grommet';

const AccountSettingsLayout = ({
  accountData: { user },
  updateAccount,
  updatePassword,
  responsiveSize
}) => {
  const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    user_type: ''
  });

  const [passwordValue, setPasswordValue] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const [passwordError, setPasswordError] = useState({
    oldPassword: false,
    newPassword: false
  });

  const [formError, setFormError] = useState({
    username: false,
    email: false,
    user_type: false
  });

  useEffect(() => {
    setFormValue({
      username: user.username,
      email: user.email,
      user_type: user.user_type
    });
  }, []);

  const [userTypeView, setUserTypeView] = useState('');

  function checkFormFields() {
    if (validator.isEmpty(formValue.username))
      setFormError({ ...formError, username: true });
    if (!validator.isEmail(formValue.email))
      setFormError({ ...formError, email: true });
    if (validator.isEmpty(formValue.user_type))
      setFormError({ ...formError, user_type: true });

    if (
      !validator.isEmpty(formValue.username) &&
      validator.isEmail(formValue.email) &&
      !validator.isEmpty(formValue.user_type)
    )
      updateAccount(formValue);
  }

  function checkPasswordFields() {
    if (
      !validator.isLength(passwordValue.newPassword, { min: 6, max: undefined })
    )
      setPasswordError({ ...passwordError, newPassword: true });

    if (
      validator.isLength(passwordValue.newPassword, { min: 6, max: undefined })
    )
      updatePassword(passwordValue);
  }

  function localizeUserType(user_type, lang) {
    if (lang === 'es') {
      switch (user_type) {
        case 'student':
          return 'Estudiante';
        default:
          return 'Profesor';
      }
    }
    if (lang === 'en') {
      switch (user_type) {
        case 'Estudiante':
          return 'student';
        default:
          return 'teacher';
      }
    }
  }
  return (
    <Box
      fill
      margin={
        responsiveSize === 'small'
          ? { top: '50px', horizontal: 'auto' }
          : { vertical: '0', horizontal: 'auto' }
      }
      maxWidth={responsiveSize === 'small' ? '100%' : '80%'}
    >
      <Heading
        level={2}
        textAlign="center"
        alignSelf="center"
        color="gray1"
        size="large"
      >
        Ajustes de tu cuenta
      </Heading>
      <Box
        maxWidth={responsiveSize === 'small' ? '100%' : '30%'}
        fill
        margin={{ top: '25px', bottom: '0', horizontal: 'auto' }}
      >
        <Form
          onSubmit={() => {
            checkFormFields();
          }}
          errors={formError}
          value={formValue}
        >
          <FormField
            label={
              <Text textAlign="left" as="label">
                Nombre de usuario
              </Text>
            }
            name="username"
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            focusIndicator
            onChange={event => {
              setFormValue({ ...formValue, username: event.target.value });
              setFormError({ ...formError, username: false });
            }}
          />
          <FormField
            label={
              <Text textAlign="left" as="label">
                Email
              </Text>
            }
            name="email"
            type="email"
            placeholder="Ingresa tu email"
            focusIndicator
            onChange={event => {
              setFormValue({ ...formValue, email: event.target.value });
              setFormError({ ...formError, email: false });
            }}
          />
          <FormField
            label={
              <Text textAlign="left" as="label">
                Tipo de usuario
              </Text>
            }
            name="user_type"
            component={() => (
              <Select
                options={[
                  { value: 'student', label: 'Estudiante' },
                  { value: 'teacher', label: 'Profesor' }
                ]}
                labelKey={o => {
                  return o.label;
                }}
                value={localizeUserType(formValue.user_type, 'es')}
                placeholder="Selecciona el tipo de usuario"
                onChange={({ option }) => {
                  setUserTypeView(option.label);
                  setFormValue({ ...formValue, user_type: option.value });
                  setFormError({ ...formError, user_type: false });
                  return null;
                }}
              />
            )}
            focusIndicator
          />

          <Button
            type="submit"
            label="Guardar configuración"
            margin={{ vertical: '30px', horizontal: 'auto' }}
            dsp="block"
          />
        </Form>
        <Heading level={4} margin="medium">
          Reestablecer contraseña
        </Heading>
        <Form
          onSubmit={() => {
            checkPasswordFields();
          }}
          errors={passwordError}
          value={passwordValue}
        >
          <FormField
            label={
              <Text textAlign="left" as="label">
                Contraseña actual
              </Text>
            }
            name="oldPassword"
            type="password"
            placeholder="Ingresa tu contraseña actual"
            focusIndicator
            onChange={event => {
              setPasswordValue({
                ...passwordValue,
                oldPassword: event.target.value
              });
              setPasswordError({ ...passwordError, oldPassword: false });
            }}
          />
          <FormField
            label={
              <Text textAlign="left" as="label">
                Nueva Contraseña
              </Text>
            }
            name="newPassword"
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            focusIndicator
            help="Debe contener, por lo menos, 6 caracteres."
            onChange={event => {
              setPasswordValue({
                ...passwordValue,
                newPassword: event.target.value
              });
              setPasswordError({ ...passwordError, newPassword: false });
            }}
          />
          <Button
            type="submit"
            label="Cambiar contraseña"
            margin={{ vertical: '30px', horizontal: 'auto' }}
            dsp="block"
          />
        </Form>
      </Box>
    </Box>
  );
};

export default AccountSettingsLayout;
