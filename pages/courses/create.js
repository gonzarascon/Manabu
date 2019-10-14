import React, { PureComponent } from 'react';
import { userRouter } from 'next/router';
import { Layout } from 'components';

class create extends PureComponent {
  static async getInitialProps({ query }) {
    console.log('query', query.user_id);
    const { user_id } = query;
    return { user_id };
  }

  render() {
    const {
      props: { user_id, viewportSize, actualUser }
    } = this;
    return (
      <Layout responsiveSize={viewportSize} userData={actualUser}>
        Crear curso para usuario: {user_id}
      </Layout>
    );
  }
}

export default create;
