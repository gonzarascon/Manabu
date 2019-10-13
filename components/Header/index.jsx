import React, { PureComponent } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import { Box, DropButton, TextInput, Image, Anchor, Button } from 'grommet';
import { Search, User, Logout, Code, Add } from 'grommet-icons';
import Avatar from 'react-avatar';

import { icons, checkUserData } from '../../constants';

import LoginLayer from '../LoginLayer';

function handleLogout() {
  axios
    .post(`/persons/logout`, { route: Router.route })
    .then(() => window.location.reload())
    .catch(error => {
      console.error('logout error', error);
      return `Can't Logout`;
    });
}

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false
    };

    this.toggleLogin = this.toggleLogin.bind(this);
    this.loginFormHandler = this.loginFormHandler.bind(this);
  }

  loginFormHandler(value) {
    const { login } = this.props;
    login(value);
    this.toggleLogin();
  }

  toggleLogin() {
    const {
      state: { loginOpen }
    } = this;
    this.setState({ loginOpen: !loginOpen });
  }

  // TODO: Handle input on searchbox

  renderMenuItems() {
    const {
      viewportSize,
      userData: { id, username, user_type },
      token
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
          <Anchor
            icon={<Add color="gray2" />}
            label="Nuevo curso"
            href={`/courses/create?user_id=${id}`}
            margin={{ vertical: '5px' }}
            size="small"
          />
        )}
        <Anchor
          icon={<Logout color="danger" />}
          label="Cerrar Sesion"
          margin={{ vertical: '5px' }}
          size="small"
          onClick={() => handleLogout(username)}
        />
      </Box>
    );
  }

  render() {
    const {
      state: { loginOpen },
      props: {
        viewportSize,
        userData: { username },
        userLogged
      }
    } = this;

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
        wrap
      >
        {/* Logo */}

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
          <Link href="/">
            <Image alignSelf="start" src={icons.manabu_iso} fit="contain" />
          </Link>
        </Box>

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
          basis="large"
          margin={viewportSize === 'small' ? { top: 'medium' } : 'auto'}
          height="xxsmall"
          searchContainer
          flexOrder={viewportSize === 'small' ? 3 : 1}
          elevation={viewportSize === 'small' ? 'xsmall' : 'none'}
        >
          <TextInput
            placeholder="Busca lo que quieras"
            size="medium"
            plain
            focusIndicator={false}
            type="search"
          />
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
          <Box as="nav" alignSelf="center" align="center" justify="start">
            <Box as="ul" alignSelf="center" align="center">
              <Anchor
                icon={<Code color="gray2" />}
                href="/catalog"
                label="Catalogo"
              />
            </Box>
          </Box>
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
            />
          )}
        </Box>
      </Box>
    );
  }
}

Header.propTypes = {
  viewportSize: PropTypes.string.isRequired,
  userData: PropTypes.objectOf(PropTypes.any)
};

Header.defaultProps = {
  userData: 'NO_USER'
};

export default Header;
