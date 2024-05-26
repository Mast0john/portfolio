import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero } from '@components';
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

export default function IndexPage() {
  const { t } = useTranslation();

  return (
    <Layout location={location}>
      <StyledMainContainer className="fillHeight">
        <Hero />
      </StyledMainContainer>
    </Layout>
  );
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
