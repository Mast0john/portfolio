import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { useStaticQuery, graphql } from 'gatsby';


const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  .glitch {
    position: block;
    transform: translate(-0%, -0%);
    margin: 0;
    text-decoration: none;
    color: #fff;
  }
  .glitch:before, .glitch:after {
    display: block;
    content: 'Jonathan Heyman.';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.8;
  }
  .glitch:after {
    color: #000;
    z-index: -2;
  }
  .glitch:before {
    color: #2c75ff;
    z-index: -1;
  }
  .glitch:hover:before {
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.99, 0.94);
  }
  .glitch:hover:after {
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.99, 0.94) reverse;
  }
  @keyframes glitch {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
    20% {
      -webkit-transform: translate(-5px, 5px);
      transform: translate(-5px, 5px);
    }
    40% {
      -webkit-transform: translate(-5px, -5px);
      transform: translate(-5px, -5px);
    }
    60% {
      -webkit-transform: translate(5px, 5px);
      transform: translate(5px, 5px);
    }
    80% {
      -webkit-transform: translate(5px, -5px);
      transform: translate(5px, -5px);
    }
    to {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 500px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const { t } = useTranslation();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1><Trans>Hi, my name is</Trans></h1>;
  const two = <h2 className="big-heading glitch">Jonathan Heyman.</h2>;
  const three = <h3 className="big-heading">{t("I build things for the web.")}</h3>;
  const four = (
    <p><Trans>
      I'm a software engineer based in Lille, FR specializing in building (and occasionally
      designing) exceptional websites, applications, and everything in between.
    </Trans></p>
  );
  const five = (
    <a href={`mailto:${email}`} className="email-link">
      <Trans>Get In Touch</Trans>
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <TransitionGroup component={null}>
        {isMounted &&
        items.map((item, i) => (
          <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
            <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </StyledHeroSection>
  );
};

export default Hero;