import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Image, Heading, Text, Anchor } from 'grommet';
import styled from 'styled-components';

import { calculateRem } from '../../constants';

const Description = styled(Text)`
  overflow: hidden;
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Card = ({ imageSrc, cardTitle, cardSubtitle, linkHref }) => (
  <Box
    direction="column"
    a11yTitle={`Curso ${cardTitle}`}
    align="center"
    wrap={false}
    elevation="medium"
    justify="center"
    width="260px"
    maxWidth="260px"
    height="290px"
    as="article"
  >
    <Box fill="horizontal">
      <Image src={imageSrc} objectFit="none" height="100%" />
    </Box>
    <Box
      fill="horizontal"
      height="140px"
      pad={{ horizontal: 'small', vertical: 'medium' }}
    >
      <Link href={linkHref}>
        <Anchor>
          <Heading
            a11yTitle={cardTitle}
            size={calculateRem(20)}
            maxWidth="100%"
            sans
          >
            {cardTitle}
          </Heading>
          <Description size={calculateRem(18)}>{cardSubtitle}</Description>
        </Anchor>
      </Link>
    </Box>
  </Box>
);

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  cardSubtitle: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired
};

export default Card;
