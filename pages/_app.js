import { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Grommet, ResponsiveContext } from 'grommet';
import { deepMerge } from 'grommet/utils';
import { base } from 'grommet/themes';

import { customTheme } from 'helpers/customThemes';
import { UserContext } from 'components';

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

  state = {
    user: {},
    token: null
  };

  async componentDidMount() {
    WebFont.load({
      custom: {
        families: ['Work Sans', 'Kadwa'],
        urls: ['/static/fonts/workSans.css', '/static/fonts/kadwa.css']
      }
    });

    const token = Cookies.get('token');
    if (token) {
      const fetchUser = await axios
        .get('/users/me', {
          params: { access_token: token }
        })
        .then(response => response.data)
        .catch(error => console.log(error));
      const { user } = fetchUser;
      this.setState({ token, user });
    }
  }

  loginUser = async value => {
    await axios
      .post('/form-login', { value })
      .then(response => {
        const {
          data: { token, actualUser }
        } = response;

        return this.setState({
          token,
          user: actualUser.user
        });
      })
      .catch(error => `Can't login`);
  };

  render() {
    const {
      props: { Component, pageProps },
      state: { token, user }
    } = this;
    return (
      <Fragment>
        <Grommet theme={mergedTheme} full plain>
          <ResponsiveContext.Consumer>
            {responsiveSize => (
              <>
                <Head>
                  <title>Manabu</title>
                </Head>
                <UserContext.Provider
                  value={{ token, user, login: this.loginUser }}
                >
                  <Component {...pageProps} viewportSize={responsiveSize} />
                </UserContext.Provider>
              </>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </Fragment>
    );
  }
}
