import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    const { styleTags } = this.props;
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <meta
            name="description"
            content="Manabu es la mejor plataforma gratuita para aprender a programar. Comienza ahora."
          />
          <meta
            property="og:title"
            content="Manabu - Aprende a programar gratis"
          />
          <meta
            property="og:description"
            content="
Manabu es la mejor plataforma gratuita para aprender a programar. Comienza ahora."
          />
          <meta property="og:image" content="/static/images/shareimage.png" />
          <meta property="og:url" content="https://learnmanabu.com/" />
          <meta name="twitter:card" content="summary_large_image" />

          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/images/favicon.png"
          />
          <link rel="stylesheet" href="/static/main.css" />
          <link rel="stylesheet" href="/static/reset.css" />

          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
