import React, { PureComponent } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Box,
  DropButton,
  TextInput,
  Image,
  Anchor,
  Button,
  Keyboard
} from 'grommet';
import { Search, User, Logout, Add, Configure } from 'grommet-icons';
import Avatar from 'react-avatar';

import { icons } from '../../constants';

import LoginLayer from '../LoginLayer';

async function doSearch(query) {
  Router.replace(`/search?s=${query}`);
}

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      searchQuery: ''
    };

    this.toggleLogin = this.toggleLogin.bind(this);
    this.loginFormHandler = this.loginFormHandler.bind(this);
  }

  loginFormHandler(value) {
    const { login } = this.props;
    login(value);
    // this.toggleLogin();
  }

  toggleLogin() {
    const {
      state: { loginOpen }
    } = this;
    this.setState({ loginOpen: !loginOpen });
  }

  renderMenuItems() {
    const {
      viewportSize,
      userData: { id, user_type },
      token,
      logout
    } = this.props;
    return (
      <Box
        pad={viewportSize === 'small' ? 'medium' : 'small'}
        width={viewportSize === 'small' ? '100%' : '200px'}
      >
        <Link
          href={`/users/profile/${id}`}
          as={`/users/profile/${id}?at=${token}`}
        >
          <Anchor
            icon={<User color="gray2" />}
            label="Ver Perfil"
            margin={{ vertical: '5px' }}
            size="small"
          />
        </Link>
        {_.isEqual(user_type, 'teacher') && (
          <Link href={`/courses/create/${id}`} as={`/courses/create/${id}`}>
            <Anchor
              icon={<Add color="gray2" />}
              label="Nuevo curso"
              margin={{ vertical: '5px' }}
              size="small"
            />
          </Link>
        )}
        <Link
          href={`/users/${id}/account`}
          as={`/users/${id}/account?at=${token}`}
        >
          <Anchor
            icon={<Configure color="gray2" />}
            label="Ajustes de cuenta"
            margin={{ vertical: '5px' }}
            size="small"
          />
        </Link>
        <Anchor
          icon={<Logout color="danger" />}
          label="Cerrar Sesion"
          margin={{ vertical: '5px' }}
          size="small"
          onClick={() => logout()}
        />
      </Box>
    );
  }

  render() {
    const {
      state: { loginOpen, searchQuery },
      props: {
        viewportSize,
        userData: { username },
        userLogged,
        loginError
      }
    } = this;

    console.log(viewportSize);
    return (
      <Box
        a11yTitle="Main Navigation"
        animation="fadeIn"
        responsive
        direction="row"
        as="header"
        pad={{ top: 'small', horizontal: 'xsmall', bottom: 'small' }}
        fill="horizontal"
        align="center"
        justify="between"
        wrap={viewportSize === 'small' ? true : false}
      >
        {/* Logo */}

        <Anchor maxWidth="" href="/">
          <Box
            a11yTitle="Manabu, a gamified e-learning platform"
            direction="row"
            gap="small"
            align="center"
            as="h1"
            responsive
            basis="small"
            height="100%"
            justify="start"
            alignSelf="start"
            flexOrder={0}
            maxWidth="90px"
          >
            <Image alignSelf="start" src={icons.manabu_iso} fit="contain" />
          </Box>
        </Anchor>

        {/* Searchbox */}
        <Box
          a11yTitle="Search box"
          direction="row"
          gap="medium"
          align="center"
          responsive
          background="gray4"
          pad={{ vertical: 'xsmall', horizontal: 'medium' }}
          round="small"
          margin={viewportSize === 'small' ? { top: 'medium' } : 'auto'}
          basis={viewportSize === 'small' ? 'full' : '2/3'}
          height="xxsmall"
          searchContainer
          flexOrder={viewportSize === 'small' ? 3 : 1}
          elevation={viewportSize === 'small' ? 'xsmall' : 'none'}
        >
          <Keyboard onEnter={() => doSearch(searchQuery)}>
            <TextInput
              placeholder="Busca cursos por lenguaje"
              size="medium"
              plain
              value={searchQuery}
              onChange={({ target }) =>
                this.setState({ searchQuery: target.value })
              }
              focusIndicator={false}
              type="search"
            />
          </Keyboard>
          <Search color="brand" />
        </Box>

        {/* Avatar + Navigation */}

        <Box
          alignSelf="center"
          align="center"
          direction="row"
          justify="between"
          justifySelf="end"
          gap="small"
          margin={{ right: 'xsmall' }}
          flexOrder={viewportSize === 'small' ? 1 : 3}
        >
          {!userLogged && (
            <Button
              label="Iniciar sesion"
              onClick={this.toggleLogin}
              alignSelf="center"
              backgroundColor="#FFD44D"
              bWidth="0"
              bRadius="0"
              fontWeight="600"
            />
          )}
          {userLogged && (
            <DropButton
              as="a"
              alignSelf="center"
              dropAlign={{ top: 'bottom', right: 'right' }}
              dropContent={this.renderMenuItems()}
            >
              <Avatar round size="50" name={username} />
            </DropButton>
          )}
          {loginOpen && (
            <LoginLayer
              closeHandler={this.toggleLogin}
              submitFormHandler={this.loginFormHandler}
              loginError={loginError}
            />
          )}
        </Box>
      </Box>
    );
  }
}

Header.propTypes = {
  viewportSize: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(PropTypes.any),
  userLogged: PropTypes.bool.isRequired,
  token: PropTypes.any.isRequired,
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

Header.defaultProps = {
  userData: 'NO_USER'
};

export default Header;
