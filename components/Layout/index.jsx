import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import UserContext from '../UserContext';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children, responsiveSize }) => {
  const { login, user, userLogged, token, logout, loginError } = useContext(
    UserContext
  );
  return (
    <Box
      margin={{ vertical: '0', horizontal: 'auto' }}
      pad="small"
      as="section"
      maxWidth="1640px"
    >
      <Header
        viewportSize={responsiveSize}
        userData={user}
        login={login}
        userLogged={userLogged}
        token={token}
        logout={logout}
        loginError={loginError}
      />
      {children}
      <Footer viewportSize={responsiveSize} />
    </Box>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  responsiveSize: PropTypes.string.isRequired
};

export default Layout;
