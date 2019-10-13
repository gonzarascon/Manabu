import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Box, Heading, Text, Anchor } from 'grommet';
import { Book } from 'grommet-icons';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { calculateRem } from 'constants';
import Card from '../Card';

const SupportText = styled(Text)`
  display: block;
  margin: auto;
  text-align: center;
  font-size: ${calculateRem(20)};
  svg {
    opacity: 0.75;
    display: block;
    margin: 15px auto;
  }
  a {
    color: #5aae00;
    display: block;
  }
`;

const settings = {
  dots: true,
  infinite: true,
  autoplay: false,
  arrows: false,
  variableWidth: true,
  centerPadding: '50px',
  slidesToShow: 1
};

const checkSlidesToShow = size => {
  if (size === 'small') {
    return 1;
  }

  if (size === 'medium') {
    return 3;
  }

  if (size !== 'medium' && size !== 'small') {
    return 4;
  }

  return 3;
};
const SliderRow = ({ headingLabel, cards, responsiveSize }) => (
  <Box fill="horizontal">
    <Box fill="horizontal">
      <Heading color="gray1" level={2}>
        {headingLabel}
      </Heading>
    </Box>
    <Box fill="horizontal" height="300px">
      {cards.length === 0 && (
        <SupportText>
          <Book size="large" />
          Aún no tomaste ningun curso. ¿Qué estas esperando?
          <Link href="/catalog">
            <Anchor label="Encuentra el curso perfecto para ti ahora." />
          </Link>
        </SupportText>
      )}
      {cards.length >= 1 && (
        <Slider slidesToShow={checkSlidesToShow(responsiveSize)} {...settings}>
          {cards.map(card => (
            <Card
              imageSrc={card.imageSrc}
              cardTitle={card.cardTitle}
              cardSubtitle={card.cardSubtitle}
              key={card.id}
              linkHref={`course/${card.id}`}
              linkAs={`course/${card.id}`}
            />
          ))}
        </Slider>
      )}
    </Box>
  </Box>
);

SliderRow.propTypes = {
  headingLabel: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  responsiveSize: PropTypes.string.isRequired
};

export default SliderRow;
