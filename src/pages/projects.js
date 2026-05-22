// i18next-extract-mark-ns-start work
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Featured, Projects } from '@components';
import { graphql } from 'gatsby';
import { WithLocales } from '@utils/WithLocales';

const StyledMainContainer = styled.main`
  counter-reset: section + 4;
`;

const ProjectsPage = ({ location, data }) => (
  <WithLocales data={data}>
    <Layout location={location}>
      <StyledMainContainer>
        <Featured />
        <Projects />
      </StyledMainContainer>
    </Layout>
  </WithLocales>
);

ProjectsPage.propTypes = {
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

export default ProjectsPage;
