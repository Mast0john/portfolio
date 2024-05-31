// i18next-extract-mark-ns-start skills
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Skills } from '@components';
import { graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section+2;
`;

const SkillPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Skills />
    </StyledMainContainer>
  </Layout>
);

SkillPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default SkillPage;

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
