import React from 'react';
import { Layout, SignUpLayout } from 'components';

const SignUp = ({ viewportSize }) => (
  <Layout responsiveSize={viewportSize}>
    <SignUpLayout />
  </Layout>
);

export default SignUp;
