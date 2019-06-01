import React, { PureComponent } from 'react';
import { Link } from 'next/link';
import { Box, Grid, Button, TextInput, Image, ThemeContext } from 'grommet';
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
        pad="small"
        fill="horizontal"
        flex
        align="center"
        justify="between"
        wrap
        height="70px"
      >
        <ThemeContext.Extend value={{ box: {}, image: {} }}>
          <Box
            a11yTitle="Manabu, a gamified e-learning platform"
            direction="row"
            gap="small"
            align="center"
            as="h1"
            flex
            responsive
            fill
            basis="xxxsmall"
            height="small"
            justify="start"
          >
            <Image src="static/images/manabu_logo.png" fit="contain" />
          </Box>
        </ThemeContext.Extend>

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
          fill
          margin={{ right: 'xlarge' }}
        >
          <TextInput
            placeholder="Busca lo que quieras"
            size="medium"
            plain
            focusIndicator={false}
          />
          <Search />
        </Box>
        <Button alignSelf="end" as="a" basis="medium">
          <Avatar round size="50" />
        </Button>
      </Box>
    );
  }
}

export default Header;
