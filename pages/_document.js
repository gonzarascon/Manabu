import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage(App => props => {
      return <App {...props} />;
    });

    return { ...page };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="/static/main.css" />
          <link rel="stylesheet" href="/static/reset.css" />
          {/* Meta tags here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
