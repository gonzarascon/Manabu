import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Card from '../Card';

const settings = {
  dots: true,
  infinite: true,
  autoplay: false,
  variableWidth: true,
  centerPadding: '50px',
};

const checkSlidesToShow = size => (size === 'small' ? 1 : 5);
const SliderRow = ({ headingLabel, cards, responsiveSize }) => (
  <Box fill="horizontal" margin={{ vertical: '50px' }}>
    <Box fill="horizontal">
      <Heading color="gray1">{headingLabel}</Heading>
    </Box>
    <Box fill="horizontal" height="300px" margin={{ vertical: '50px' }}>
      <Slider slidesToShow={checkSlidesToShow(responsiveSize)} {...settings}>
        {cards.map(card => (
          <Card
            imageSrc={card.imageSrc}
            cardTitle={card.cardTitle}
            cardSubtitle={card.cardSubtitle}
            key={card.id}
            anchorHref={`/course/${card.id}`}
          />
        ))}
      </Slider>
    </Box>
  </Box>
);

SliderRow.propTypes = {
  headingLabel: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  responsiveSize: PropTypes.string.isRequired,
};

export default SliderRow;
