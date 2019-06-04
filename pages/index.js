import React from 'react';
import Link from 'next/link';
import { Box } from 'grommet';
import { SliderRow } from 'components';

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

const Home = ({ viewportSize }) => (
  <Box fill maxWidth="95%" margin={{ vertical: 0, horizontal: 'auto' }}>
    <SliderRow
      responsiveSize={viewportSize}
      headingLabel="Continua donde lo dejaste"
      cards={cardsArray}
    />
    <SliderRow
      responsiveSize={viewportSize}
      headingLabel="Es momento de aprender algo nuevo"
      cards={cardsArray}
    />
  </Box>
);

export default Home;
