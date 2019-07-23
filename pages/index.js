import React, { useEffect, Fragment } from 'react';
import Link from 'next/link';
import { Box, Image } from 'grommet';
import { SliderRow, HighlightLink, WelcomeWrapper } from 'components';
import _ from 'lodash';

const Home = ({ viewportSize, data }) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(err =>
          console.error(`Service worker registration failed ${err}`),
        );
    } else {
      console.log('Service Worker not supported or disabled');
    }
  });

  const renderSlider = heading => {
    let cardsArray = [];
    if (data)
      data.forEach(course => {
        const cardData = {
          id: course.id,
          imageSrc: 'static/images/card_default.png',
          cardTitle: course.name,
          cardSubtitle: course.user.username,
        };

        cardsArray.push(cardData);
      });

    return (
      <SliderRow
        responsiveSize={viewportSize}
        headingLabel={heading}
        cards={cardsArray}
      />
    );
  };

  return (
    <Fragment>
      <WelcomeWrapper></WelcomeWrapper>
      <Box fill maxWidth="95%" margin={{ vertical: '0', horizontal: 'auto' }}>
        <Box margin={{ vertical: '50px' }}>
          {renderSlider('Continua donde lo dejaste')}
        </Box>
      </Box>

      <Box fill="horizontal">
        <Image src="/static/images/courses_banner.png" fit="contain"></Image>
      </Box>

      <Box fill maxWidth="95%" margin={{ vertical: '0', horizontal: 'auto' }}>
        <Box margin={{ vertical: '50px' }}>
          {renderSlider('Es momento de aprender algo nuevo')}
        </Box>
        <HighlightLink
          textLabel="¿Quieres enseñar lo que sabes?"
          anchorLabel="Regístrate como docente."
          anchorHref="#"
          responsiveSize={viewportSize}
        />
      </Box>
    </Fragment>
  );
};

Home.getInitialProps = async ({ query: { basicData } }) => {
  const res = await basicData;
  return { data: res };
};

export default Home;
