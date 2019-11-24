import React, { useState } from 'react';
import Router from 'next/router';
import { user } from '../api';
import { Layout, AccountSettingsLayout } from 'components';

const Account = ({ viewportSize, accountData, user_id, access_token }) => {
  const [updateError, setUpdateError] = useState(false);

  async function updateAccount(updatedData) {
    await user
      .updateUserAccount(user_id, updatedData, access_token)
      .then(() => {
        if (updateError === true) setUpdateError(false);
        Router.reload();
      })
      .catch(() => setUpdateError(true));
  }

  return (
    <Layout responsiveSize={viewportSize}>
      <AccountSettingsLayout
        accountData={accountData}
        updateAccount={updateAccount}
      />
    </Layout>
  );
};

Account.getInitialProps = async ({
  query: { accountData, user_id, access_token }
}) => {
  const ad = await accountData;
  const at = await access_token;
  const ui = await user_id;
  return { accountData: ad, user_id: ui, access_token: at };
};

export default Account;
