// i18next-extract-mark-ns-start resume
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Resume } from '@components';
import { graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section+5;
`;

const ResumePage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Resume />
    </StyledMainContainer>
  </Layout>
);

ResumePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ResumePage;

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