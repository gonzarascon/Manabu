import React, { PureComponent } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Grommet, Grid } from 'grommet';
import styled from 'styled-components';

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
        <MainWrapper>
          <Grid
            fill
            columns={{ count: 'fill', size: 'medium' }}
            gap="medium"
            color="custom"
          >
            <Head>
              <title>Manabu</title>
            </Head>
            <Component {...pageProps} />
          </Grid>
        </MainWrapper>
      </Grommet>
    );
  }
}
