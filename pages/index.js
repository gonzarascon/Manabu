import React, { useEffect, Fragment } from 'react';
import Link from 'next/link';
import { Box, Image } from 'grommet';
import { Layout, HomeLayout } from 'components';

const Home = ({ viewportSize, data, token, actualUser }) => (
  <Layout responsiveSize={viewportSize} userData={actualUser}>
    <HomeLayout
      viewportSize={viewportSize}
      data={data}
      token={token}
      actualUser={actualUser}
    />
  </Layout>
);

Home.getInitialProps = async ({ query: { basicData, user } }) => {
  const resBasicData = await basicData;
  const resUser = await user;
  return { data: resBasicData, actualUser: resUser };
};

export default Home;
