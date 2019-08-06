import React, { PureComponent, Fragment } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { deepMerge } from 'grommet/utils';
import { base } from 'grommet/themes';
import { Grommet, ResponsiveContext, Box } from 'grommet';
import styled from 'styled-components';
import nextCookie from 'next-cookies';
import fetch from 'isomorphic-unfetch';

import { GlobalStyle } from 'static/globalStyles';

import { customTheme } from 'helpers/customThemes';

import { Header as CustomHeader, Footer as CustomFooter } from 'components';

const MainWrapper = styled.main`
  width: 100%;
  max-width: 1640px;
`;

const mergedTheme = deepMerge(base, customTheme);

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};
    const { token } = nextCookie(ctx);

    if (token) {
      const reqActualUser = await fetch(
        `http://localhost:3002/actual-user?token=${token}`,
      ).then(r => {
        console.log(r);
      });
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps = { ...pageProps, token };

    return { pageProps };
  }

  render() {
    const {
      Component,
      pageProps,
      pageProps: { token },
    } = this.props;
    return (
      <Fragment>
        <GlobalStyle />
        <Grommet theme={mergedTheme} full plain>
          <Head>
            <title>Manabu</title>
          </Head>
          <ResponsiveContext.Consumer>
            {responsiveSize => (
              <Box
                margin={{ vertical: '0', horizontal: 'auto' }}
                pad="small"
                as="section"
                maxWidth="1640px"
              >
                <CustomHeader viewportSize={responsiveSize} />
                <Component {...pageProps} viewportSize={responsiveSize} />
                <CustomFooter viewportSize={responsiveSize} />
              </Box>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </Fragment>
    );
  }
}
