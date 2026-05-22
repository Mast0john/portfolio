// i18next-extract-mark-ns-start contact
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Contact } from '@components';
import { graphql } from 'gatsby';
import { WithLocales } from '@utils/WithLocales';

const StyledMainContainer = styled.main`
  counter-reset: section + 6;
`;

const ContactPage = ({ location, data }) => (
  <WithLocales data={data}>
    <Layout location={location}>
      <StyledMainContainer>
        <Contact locales={data.locales} />
      </StyledMainContainer>
    </Layout>
  </WithLocales>
);

ContactPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($language: String!) {
    locales: allLocale(
      filter: {
        ns: {
          in: [
            "404"
            "about"
            "contact"
            "archive"
            "translation"
            "experiences"
            "projects"
            "resume"
            "skills"
          ]
        }
        language: { eq: $language }
      }
    ) {
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
export default ContactPage;
