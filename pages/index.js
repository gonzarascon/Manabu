import React from 'react';
import api from '../api';
import _ from 'lodash';
import { Layout, HomeLayout } from 'components';

const Home = ({ viewportSize, data, token, actualUser, userCourses }) => {
  const coursesData = _.filter(data, item => _.isEqual(item.state, 'active'));

  return (
    <Layout responsiveSize={viewportSize} userData={actualUser}>
      <HomeLayout
        viewportSize={viewportSize}
        data={coursesData}
        token={token}
        actualUser={actualUser}
        userCourses={userCourses}
      />
    </Layout>
  );
};

Home.getInitialProps = async ({ query: { user }, query }) => {
  const basicData = await api.main.getBasicData();
  const resUser = await user;
  const userCourses = resUser
    ? await api.user.getUserCurrentCourses(resUser.id)
    : [];

  return { data: basicData, actualUser: resUser, userCourses };
};

export default Home;
