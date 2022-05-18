import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Contact } from '@components';

const StyledMainContainer = styled.main`
  counter-reset: section+5;
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
