import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children, responsiveSize, userData }) => (
  <Box
    margin={{ vertical: '0', horizontal: 'auto' }}
    pad="small"
    as="section"
    maxWidth="1640px"
  >
    <Header viewportSize={responsiveSize} userData={userData} />
    {children}
    <Footer viewportSize={responsiveSize} />
  </Box>
);
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  responsiveSize: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userData: PropTypes.any.isRequired,
};

export default Layout;
