import React from 'react';
import { Catalog as CatalogLayout, Layout } from 'components';

const Catalog = ({ viewportSize, actualUser, searchResults, searchQuery }) => (
  <Layout responsiveSize={viewportSize} userData={actualUser}>
    <CatalogLayout
      responsiveSize={viewportSize}
      coursesList={searchResults}
      searchedItem={searchQuery}
    />
  </Layout>
);

Catalog.getInitialProps = async ({ query: { searchResults, searchQuery } }) => {
  const sr = await searchResults;
  const sq = await searchQuery;

  return { searchResults: sr, searchQuery: sq };
};

export default Catalog;
