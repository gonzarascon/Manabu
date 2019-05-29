import React, { PureComponent } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Grommet, Grid } from 'grommet';

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
      <Grommet theme={customTheme}>
        <Grid
          fill
          columns={{ count: 'fill', size: 'medium' }}
          gap="medium"
          maxWidth="1640px"
          color="custom"
        >
          <Head>
            <title>Manabu</title>
          </Head>
          <Component {...pageProps} />
        </Grid>
      </Grommet>
    );
  }
}
