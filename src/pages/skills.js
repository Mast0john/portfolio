// i18next-extract-mark-ns-start skills
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Skills } from '@components';
import { graphql } from 'gatsby';
import { WithLocales } from '@utils/WithLocales';

const StyledMainContainer = styled.main`
  counter-reset: section + 2;
`;

const SkillPage = ({ location, data }) => (
  <WithLocales data={data}>
    <Layout location={location}>
      <StyledMainContainer>
        <Skills />
      </StyledMainContainer>
    </Layout>
  </WithLocales>
);

SkillPage.propTypes = {
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

export default SkillPage;
