import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero } from '@components';
import { graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

export default function IndexPage() {

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

export const query = (graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["404","about", "contact", "translation", "jobs", "work", "resume", "skills"] },
language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`);