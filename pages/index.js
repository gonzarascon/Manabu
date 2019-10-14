import React from 'react';
import api from '../api';
import { Layout, HomeLayout } from 'components';

const Home = ({ viewportSize, data, token, actualUser, basicData }) => (
  <Layout responsiveSize={viewportSize} userData={actualUser}>
    <HomeLayout
      viewportSize={viewportSize}
      data={data}
      token={token}
      actualUser={actualUser}
    />
  </Layout>
);

Home.getInitialProps = async ({ query: { user }, query }) => {
  const basicData = await api.main.getBasicData();
  const resUser = await user;
  console.log('basicData', basicData);
  return { data: basicData, actualUser: resUser };
};

export default Home;
