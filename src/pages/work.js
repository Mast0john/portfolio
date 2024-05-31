// i18next-extract-mark-ns-start work
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Featured, Projects } from '@components';
import { graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section+4;
`;

const WorkPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Featured />
      <Projects />
    </StyledMainContainer>
  </Layout>
);

WorkPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default WorkPage;

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