import { Fragment } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { deepMerge } from 'grommet/utils';
import { base } from 'grommet/themes';
import { Grommet, ResponsiveContext } from 'grommet';
import nextCookie from 'next-cookies';
import axios from 'axios';

import { GlobalStyle } from 'static/globalStyles';
import { customTheme } from 'helpers/customThemes';
import { checkUserData } from '../constants/';

const mergedTheme = deepMerge(base, customTheme);

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};
    const { token } = await nextCookie(ctx);
    let userData = 'NO_USER';

    if (token) {
      await axios
        .get(`http://localhost:3002/actual-user?token=${token}`)
        .then(r => {
          const {
            data: { user },
          } = r;
          userData = user;
          return;
        })
        .catch(e => {
          userData = 'NO_USER';
          return;
        });
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (checkUserData(pageProps.actualUser)) userData = pageProps.actualUser;

    pageProps = { ...pageProps, token, actualUser: userData };

    console.log('pageProps', pageProps);

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <GlobalStyle />
        <Grommet theme={mergedTheme} full plain>
          <ResponsiveContext.Consumer>
            {responsiveSize => (
              <Container>
                <Head>
                  <title>Manabu</title>
                </Head>
                <Component {...pageProps} viewportSize={responsiveSize} />
              </Container>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </Fragment>
    );
  }
}
