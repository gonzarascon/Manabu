import React, { useEffect, Fragment, useContext } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Box, Image } from 'grommet';
import SliderRow from '../SliderRow';
import HighlightLink from '../HighlightLink';
import WelcomeWrapper from '../WelcomeWrapper';
import UserContext from '../UserContext';

const HomeLayout = ({
  viewportSize,
  data,
  actualUser: { id, username, user_type },
  userCourses
}) => {
  const { login, user, userLogged, token, logout } = useContext(UserContext);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(err =>
          console.error(`Service worker registration failed ${err}`)
        );
    } else {
      console.log('Service Worker not supported or disabled');
    }
  });

  const renderSlider = (heading, dataForCards) => {
    return (
      <SliderRow
        responsiveSize={viewportSize}
        headingLabel={heading}
        cards={dataForCards}
      />
    );
  };
  return (
    <Fragment>
      <WelcomeWrapper />
      {!_.isEqual(userLogged, false) && (
        <Box fill maxWidth="95%" margin={{ vertical: '0', horizontal: 'auto' }}>
          <Box margin={{ vertical: '50px' }}>
            {renderSlider('Continua donde lo dejaste', userCourses)}
          </Box>
        </Box>
      )}
      {_.isEqual(userLogged, false) && (
        <HighlightLink
          textLabel="¿Nuevo por aquí?"
          anchorLabel="Registrate y comienza a aprender."
          anchorHref="/sign_up"
          responsiveSize={viewportSize}
        />
      )}
      <Box fill="horizontal" height={viewportSize === 'small' ? '376px' : null}>
        <Image
          src={
            viewportSize === 'small'
              ? '/static/images/courses_banner-mobile.png'
              : '/static/images/courses_banner.png'
          }
          fit="contain"
        />
      </Box>

      <Box fill maxWidth="95%" margin={{ vertical: '0', horizontal: 'auto' }}>
        <Box margin={{ vertical: '50px' }}>
          {renderSlider('Es momento de aprender algo nuevo', data)}
        </Box>
        {/* {user_type !== 'teacher' && (
          <HighlightLink
            textLabel="¿Quieres enseñar lo que sabes?"
            anchorLabel="Regístrate como docente."
            anchorHref={`/users/${username}/${id}/teacher_registry`}
            responsiveSize={viewportSize}
          />
        )} */}
      </Box>
    </Fragment>
  );
};

HomeLayout.propTypes = {
  viewportSize: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.string,
  actualUser: PropTypes.objectOf(PropTypes.any)
};

HomeLayout.defaultProps = {
  token: 'NO_TOKEN',
  actualUser: {}
};

export default HomeLayout;
