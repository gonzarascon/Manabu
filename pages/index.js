import React from 'react';
import api from '../api';
import { Layout, HomeLayout } from 'components';

const Home = ({ viewportSize, data, token, actualUser, userCourses }) => (
  <Layout responsiveSize={viewportSize} userData={actualUser}>
    {console.log(userCourses)}
    <HomeLayout
      viewportSize={viewportSize}
      data={data}
      token={token}
      actualUser={actualUser}
      userCourses={userCourses}
    />
  </Layout>
);

Home.getInitialProps = async ({ query: { user }, query }) => {
  const basicData = await api.main.getBasicData();
  const resUser = await user;
  console.log('resUser', resUser);
  const userCourses = resUser
    ? await api.user.getUserCurrentCourses(resUser.id)
    : [];
  console.log('userCourses', userCourses);
  return { data: basicData, actualUser: resUser, userCourses };
};

export default Home;
