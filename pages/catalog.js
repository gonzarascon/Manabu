import React from 'react';
import { Catalog as CatalogLayout, Layout } from 'components';

const Catalog = ({ viewportSize, actualUser }) => (
  <Layout responsiveSize={viewportSize} userData={actualUser}>
    <CatalogLayout responsiveSize={viewportSize} />
  </Layout>
);

Catalog.getInitialProps = async ({ searchResults }) => {
  console.log('search results', await searchResults);
};

export default Catalog;
