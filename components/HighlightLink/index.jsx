import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Anchor } from 'grommet';

const HighlightLink = ({
  textLabel,
  anchorLabel,
  anchorHref,
  responsiveSize,
}) => (
  <Box
    as="section"
    pad="medium"
    border={{ color: 'brand', size: 'small' }}
    round="small"
    responsive
    // justify="center"
    direction={responsiveSize === 'small' ? 'column' : 'row'}
    align="center"
    maxWidth="800px"
    margin={{ vertical: '0', horizontal: 'auto' }}
  >
    <Text>{textLabel}</Text>
    {'\u00A0'}
    <Anchor
      href={anchorHref}
      label={anchorLabel}
      fontWeight="600"
      size="medium"
    />
  </Box>
);

HighlightLink.propTypes = {
  textLabel: PropTypes.string.isRequired,
  anchorLabel: PropTypes.string.isRequired,
  anchorHref: PropTypes.string.isRequired,
  responsiveSize: PropTypes.string.isRequired,
};

export default HighlightLink;
