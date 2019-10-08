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
  // static async getInitialProps({ Component, ctx, req }) {
  //   let pageProps = {};
  //   pageProps = { ...pageProps };

  //   return { pageProps };
  // }

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
        <style jsx global>
          {`          ${fontFace(
            Fonts.KadwaBold,
            Fonts.KadwaBoldwf2,
            'Kadwa',
            'bold'
          )}
          ${fontFace(
            Fonts.KadwaRegular,
            Fonts.KadwaRegularwf2,
            'Kadwa',
            'normal'
          )}
          ${fontFace(
            Fonts.WorkSansExtraBold,
            Fonts.WorkSansExtraBoldwf2,
            'WorkSans',
            700
          )}

          ${fontFace(
            Fonts.WorkSansSemiBold,
            Fonts.WorkSansSemiBoldwf2,
            'WorkSans',
            600
          )}

          ${fontFace(
            Fonts.WorkSansRegular,
            Fonts.WorkSansRegularwf2,
            'WorkSans',
            'normal'
          )}`}
        </style>
      </Fragment>
    );
  }
}
