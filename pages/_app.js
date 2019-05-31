import React, { PureComponent } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Grommet, Grid } from 'grommet';
import styled from 'styled-components';

import { Header as CustomHeader } from 'components';

const MainWrapper = styled.main`
  width: 100%;
  max-width: 1640px;
`;

const customTheme = {
  global: {
    colors: {
      custom: '#cc6633',
    },
  },
};

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Grommet theme={customTheme} full plain>
        <Head>
          <title>Manabu</title>
        </Head>
        <CustomHeader />
        <Component {...pageProps} />
      </Grommet>
    );
  }
}
