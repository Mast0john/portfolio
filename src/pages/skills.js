import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Skills } from '@components';

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
