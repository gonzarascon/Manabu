import { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
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
    token: null,
    userLogged: false
  };

  async componentDidMount() {
    const { pageProps } = this.props;
    WebFont.load({
      custom: {
        families: ['Work Sans', 'Kadwa'],
        urls: [
          '/public/static/fonts/workSans.css',
          '/public/static/fonts/kadwa.css'
        ]
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
      let isLogged = false;
      if (user !== undefined) {
        isLogged = true;
      }
      this.setState({ token, user, userLogged: isLogged });
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
          user: actualUser.user,
          userLogged: true
        });
      })
      .catch(error => `Can't login`);
  };

  logoutUser = async () => {
    axios
      .post(`/users/logout`, { params: { access_token: this.state.token } })
      .then(() => {
        this.setState({ token: null, user: {}, userLogged: false });
        Router.replace('/');
      })
      .catch(error => {
        console.error('logout error', error);
        return `Can't Logout`;
      });
  };

  render() {
    const {
      props: { Component, pageProps },
      state: { token, user, userLogged }
    } = this;
    return (
      <Fragment>
        <Grommet theme={mergedTheme} full plain cssVars>
          <ResponsiveContext.Consumer>
            {responsiveSize => (
              <>
                <Head>
                  <title>Manabu</title>
                </Head>
                <UserContext.Provider
                  value={{
                    token,
                    user,
                    userLogged,
                    login: this.loginUser,
                    logout: this.logoutUser
                  }}
                >
                  <Component
                    {...pageProps}
                    {...user}
                    viewportSize={responsiveSize}
                    access_token={token}
                    loggedUserData={user}
                  />
                </UserContext.Provider>
              </>
            )}
          </ResponsiveContext.Consumer>
        </Grommet>
      </Fragment>
    );
  }
}
