import React from 'react';
import { Layout, ErrorLayout } from 'components';

function Error({ statusCode, viewportSize, actualUser }) {
  return (
    <Layout responsiveSize={viewportSize} userData={actualUser}>
      <ErrorLayout />
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
