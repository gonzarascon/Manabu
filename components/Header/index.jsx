import React, { PureComponent } from 'react';
import { Link } from 'next/link';
import { Box, Grid, Button, TextInput, Image } from 'grommet';
import { Search } from 'grommet-icons';
import Avatar from 'react-avatar';

class Header extends PureComponent {
  render() {
    return (
      <Box
        a11yTitle="Main Navigation"
        animation="fadeIn"
        gap="medium"
        responsive
        direction="row-responsive"
        as="header"
        pad="small"
        fill="horizontal"
        flex
        align="center"
      >
        <h1>Header</h1>
        <TextInput placeholder="Busca lo que quieras" size="small" />
        <Button alignSelf="end" as="a">
          <Avatar round size="50" />
        </Button>
      </Box>
    );
  }
}

export default Header;
