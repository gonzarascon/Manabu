import React, { PureComponent } from 'react';
import { Link } from 'next/link';
import { Box, Grid, Button, TextInput, Image, Anchor } from 'grommet';
import { Search } from 'grommet-icons';
import Avatar from 'react-avatar';

class Header extends PureComponent {
  render() {
    return (
      <Box
        a11yTitle="Main Navigation"
        animation="fadeIn"
        gap="xlarge"
        responsive
        direction="row-responsive"
        as="header"
        pad="xsmall"
        fill="horizontal"
        flex
        align="center"
        justify="stretch"
        wrap
        height="70px"
      >
        {/* Logo */}

        <Box
          a11yTitle="Manabu, a gamified e-learning platform"
          direction="row"
          gap="small"
          align="center"
          as="h1"
          flex
          responsive
          fill
          basis="xxsmall"
          height="small"
          justify="start"
          alignSelf="start"
          logoContainer
        >
          <Image
            alignSelf="start"
            src="static/images/manabu_logo.png"
            fit="contain"
            logo
          />
        </Box>

        {/* Searchbox */}
        <Box
          a11yTitle="Search box"
          direction="row"
          gap="medium"
          align="center"
          flex
          responsive
          background="gray4"
          pad={{ vertical: 'xsmall', horizontal: 'medium' }}
          round="small"
          basis="medium"
          // fill
          margin={{ vertical: 'small', right: 'xlarge' }}
          height="xxsmall"
        >
          <TextInput
            placeholder="Busca lo que quieras"
            size="medium"
            plain
            focusIndicator={false}
          />
          <Search />
        </Box>

        {/* Avatar + Navigation */}

        <Box
          basis="small"
          alignSelf="end"
          align="center"
          direction="row"
          justify="between"
        >
          <Box as="nav" alignSelf="center" align="center" justify="start">
            <Box as="ul" alignSelf="center" align="center">
              <Anchor href="#" label="Catalogo" />
            </Box>
          </Box>
          <Button as="a" alignSelf="end">
            <Avatar round size="50" />
          </Button>
        </Box>
      </Box>
    );
  }
}

export default Header;
