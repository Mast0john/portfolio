import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Featured, Projects } from '@components';

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
