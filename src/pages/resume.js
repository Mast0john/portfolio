import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Resume } from '@components';

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
