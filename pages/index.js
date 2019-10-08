import React from 'react';
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

Home.getInitialProps = async ({ query: { basicData, user }, query }) => {
  const resBasicData = await basicData;
  const resUser = await user;
  return { data: resBasicData, actualUser: resUser };
};

export default Home;
