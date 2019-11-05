import React from 'react';
import api from '../api';
import { Layout, HomeLayout } from 'components';

const Home = ({ viewportSize, data, token, actualUser, userCourses }) => (
  <Layout responsiveSize={viewportSize} userData={actualUser}>
    <HomeLayout
      viewportSize={viewportSize}
      data={data}
      token={token}
      actualUser={actualUser}
      userCourses={userCourses}
    />
  </Layout>
);

Home.getInitialProps = async ({ query: { user } }) => {
  const basicData = await api.main.getBasicData();
  const resUser = await user;
  const userCourses = user ? await api.user.getUserCurrentCourses(user.id) : [];
  return { data: basicData, actualUser: resUser, userCourses };
};

export default Home;
