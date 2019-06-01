import React, { PureComponent, Fragment } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { deepMerge } from 'grommet/utils';
import { base } from 'grommet/themes';
import { Grommet, ResponsiveContext, Box } from 'grommet';
import styled from 'styled-components';

import { GlobalStyle } from 'static/globalStyles';

import { customTheme } from 'helpers/customThemes';

import { Header as CustomHeader } from 'components';

const MainWrapper = styled.main`
  width: 100%;
  max-width: 1640px;
`;

const mergedTheme = deepMerge(base, customTheme);

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
      <Fragment>
        <GlobalStyle />
        <Grommet theme={mergedTheme} full plain>
          <Head>
            <title>Manabu</title>
          </Head>
          <ResponsiveContext.Consumer>
            {responsiveSize => (
              <Box margin="small">
                <CustomHeader globalResponsive={responsiveSize} />
                <Component {...pageProps} />
              </Box>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </Fragment>
    );
  }
}
