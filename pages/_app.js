import { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { deepMerge } from 'grommet/utils';
import { base } from 'grommet/themes';
import { Grommet, ResponsiveContext } from 'grommet';
import nextCookie from 'next-cookies';
import axios from 'axios';

import { GlobalStyle } from 'static/globalStyles';
import { customTheme } from 'helpers/customThemes';
import { checkUserData } from '../constants/';
import { BasicData } from '../utils/fetchers';

const mergedTheme = deepMerge(base, customTheme);

export default class ManabuApp extends App {
  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {};
    console.log('req', req);
    pageProps = { ...pageProps };

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <Grommet theme={mergedTheme} full plain>
          <ResponsiveContext.Consumer>
            {responsiveSize => (
              <>
                <Head>
                  <title>Manabu</title>
                </Head>
                <Component {...pageProps} viewportSize={responsiveSize} />
              </>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </Fragment>
    );
  }
}
