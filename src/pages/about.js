// i18next-extract-mark-ns-start about
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, About } from '@components';
import { WithLocales } from '@utils/WithLocales';
import { graphql } from 'gatsby';

const StyledMainContainer = styled.main`
  counter-reset: section + 1;
`;

const AboutPage = ({ location, data }) => (
  <WithLocales data={data}>
    <Layout location={location}>
      <StyledMainContainer>
        <About />
      </StyledMainContainer>
    </Layout>
  </WithLocales>
);

AboutPage.propTypes = {
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

export default AboutPage;
