// i18next-extract-mark-ns-start jobs
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Jobs } from '@components';
import { graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section+3;
`;

const JobPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Jobs />
    </StyledMainContainer>
  </Layout>
);

JobPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default JobPage;

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