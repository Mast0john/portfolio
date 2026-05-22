// i18next-extract-mark-ns-start 404
import React, { useState, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import { WithLocales } from '@utils/WithLocales';
import { Helmet } from 'react-helmet';
import { CSSTransition, TransitionGroup } from '@utils/SafeAnimations';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navDelay } from '@utils';
import { Layout } from '@components';
import { Trans } from 'gatsby-plugin-react-i18next';

const StyledMainContainer = styled.main`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
`;
const StyledTitle = styled.h1`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
`;
const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 400;
`;
const StyledHomeButton = styled(Link)`
  ${({ theme }) => theme.mixins.bigButton};
  margin-top: 40px;
`;

const NotFoundPage = ({ location, data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <WithLocales data={data}>
      <Layout location={location}>
        <Helmet title="Page Not Found" />

        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition timeout={500} classNames="fadeup">
              <StyledMainContainer>
                <StyledTitle>404</StyledTitle>
                <StyledSubtitle>
                  <Trans>Page Not Found</Trans>
                </StyledSubtitle>
                <StyledHomeButton to="/">
                  <Trans>Go Home</Trans>
                </StyledHomeButton>
              </StyledMainContainer>
            </CSSTransition>
          )}
        </TransitionGroup>
      </Layout>
    </WithLocales>
  );
};

NotFoundPage.propTypes = {
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

export default NotFoundPage;
