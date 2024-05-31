// i18next-extract-mark-ns-start contact
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Contact } from '@components';
import { graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section+6;
`;

const ContactPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer>
      <Contact />
    </StyledMainContainer>
  </Layout>
);

ContactPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ContactPage;

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
