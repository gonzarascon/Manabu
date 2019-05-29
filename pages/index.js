import React from 'react';
import Link from 'next/link';
import { Grid } from 'grommet';

import Head from '../components/head';
import Nav from '../components/nav';

const Home = () => (
  <Grid
    rows={['xxsmall', 'xsmall']}
    columns={['xsmall', 'small']}
    gap="small"
    areas={[
      { name: 'header', start: [0, 0], end: [1, 0] },
      { name: 'nav', start: [0, 1], end: [0, 1] },
      { name: 'main', start: [1, 1], end: [1, 1] },
    ]}
  >
    <Head title="Home" />
    <Nav />
  </Grid>
);

export default Home;
