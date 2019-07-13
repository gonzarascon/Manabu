import React, { useEffect, Fragment } from 'react';
import Link from 'next/link';
import { Box, Image } from 'grommet';
import { SliderRow, HighlightLink, WelcomeWrapper } from 'components';

const cardsArray = [
  {
    id: 1,
    imageSrc: 'static/images/card_default.png',
    cardTitle: 'JavaScript desde cero - Curso Inicial',
    cardSubtitle: 'Darth Vader',
  },
  {
    id: 2,
    imageSrc: 'static/images/card_default.png',
    cardTitle: 'Callbacks vs. Requests en JavaScript',
    cardSubtitle: 'De la Rua',
  },
  {
    id: 3,
    imageSrc: 'static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
  {
    id: 3,
    imageSrc: 'static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
  {
    id: 3,
    imageSrc: 'static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
  {
    id: 3,
    imageSrc: 'static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
  {
    id: 3,
    imageSrc: 'static/images/card_default.png',
    cardTitle: 'ES6 de cero a experto',
    cardSubtitle: 'Rico Mc. Pato',
  },
];

const Home = (props, { viewportSize, data }) => {
  useEffect(() => {
    console.log(props);
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

  return (
    <Fragment>
      <WelcomeWrapper></WelcomeWrapper>
      <Box fill maxWidth="95%" margin={{ vertical: '0', horizontal: 'auto' }}>
        <Box margin={{ vertical: '50px' }}>
          <SliderRow
            responsiveSize={viewportSize}
            headingLabel="Continua donde lo dejaste"
            cards={cardsArray}
          />
        </Box>
      </Box>

      <Box fill="horizontal">
        <Image src="/static/images/courses_banner.png" fit="contain"></Image>
      </Box>

      <Box fill maxWidth="95%" margin={{ vertical: '0', horizontal: 'auto' }}>
        <Box margin={{ vertical: '50px' }}>
          <SliderRow
            responsiveSize={viewportSize}
            headingLabel="Es momento de aprender algo nuevo"
            cards={cardsArray}
          />
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

export default Home;
