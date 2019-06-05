import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, TextInput, Image, Anchor } from 'grommet';
import { Search } from 'grommet-icons';
import Avatar from 'react-avatar';

import { icons } from '../../constants';

class Header extends PureComponent {
  // TODO: Handle input on searchbox

  render() {
    const { viewportSize } = this.props;
    return (
      <Box
        a11yTitle="Main Navigation"
        animation="fadeIn"
        responsive
        direction="row"
        as="header"
        pad={{ top: 'small', horizontal: 'xsmall', bottom: 'small' }}
        fill="horizontal"
        align="center"
        justify="between"
        wrap
        // height="70px"
      >
        {/* Logo */}

        <Box
          a11yTitle="Manabu, a gamified e-learning platform"
          direction="row"
          gap="small"
          align="center"
          as="h1"
          responsive
          basis="small"
          height="100%"
          justify="start"
          alignSelf="start"
          flexOrder={0}
          maxWidth="90px"
        >
          <Image alignSelf="start" src={icons.manabu_iso} fit="contain" />
        </Box>

        {/* Searchbox */}
        <Box
          a11yTitle="Search box"
          direction="row"
          gap="medium"
          align="center"
          responsive
          background="gray4"
          pad={{ vertical: 'xsmall', horizontal: 'medium' }}
          round="small"
          basis="large"
          margin={
            viewportSize === 'small' ? { top: 'medium' } : { right: 'xlarge' }
          }
          height="xxsmall"
          searchContainer
          flexOrder={viewportSize === 'small' ? 3 : 1}
          elevation={viewportSize === 'small' ? 'xsmall' : 'none'}
        >
          <TextInput
            placeholder="Busca lo que quieras"
            size="medium"
            plain
            focusIndicator={false}
          />
          <Search color="primaryBrand" />
        </Box>

        {/* Avatar + Navigation */}

        <Box
          basis={viewportSize === 'small' ? '215px' : 'small'}
          alignSelf="center"
          align="center"
          direction="row"
          justify="between"
          justifySelf="end"
          margin={{ right: 'xsmall' }}
          flexOrder={viewportSize === 'small' ? 1 : 3}
        >
          <Box as="nav" alignSelf="center" align="center" justify="start">
            <Box as="ul" alignSelf="center" align="center">
              <Anchor href="#" label="Catalogo" />
            </Box>
          </Box>
          <Button as="a" alignSelf="center">
            <Avatar round size="50" name="Gonzalo Rascon" />
          </Button>
        </Box>
      </Box>
    );
  }
}

Header.propTypes = {
  viewportSize: PropTypes.string.isRequired,
};

export default Header;
