import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Jobs } from '@components';

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
