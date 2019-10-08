import { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';

import { Grommet, ResponsiveContext } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { base } from 'grommet/themes';

import * as Fonts from '../static/fonts';

import { fontFace } from 'constants';

import { customTheme } from 'helpers/customThemes';
const isServer = typeof window === 'undefined';
const WebFont = !isServer ? require('webfontloader') : null;

const mergedTheme = deepMerge(base, customTheme);

export default class ManabuApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    WebFont.load({
      custom: {
        families: ['Work Sans', 'Kadwa'],
        urls: ['/static/fonts/workSans.css', '/static/fonts/kadwa.css']
      }
    });
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
