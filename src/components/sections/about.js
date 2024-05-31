import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '⇢';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const { t } = useTranslation();

  const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "me.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500, traceSVG: { color: "#64ffda" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'HTML & (S)CSS', 'React', 'Vue', 'Gatsby.js', 'WordPress'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      
      <div className="inner">
        <StyledText>
          <div>
            <h2 className="numbered-heading">{t("About Me")}</h2>
            <p>{t("Software engineer based in Lille, FR.")}</p>
            <p>
              <Trans>
                I enjoy creating things that live on the internet, whether that be websites,
                applications, or anything in between. My goal is to always build products that provide
                pixel-perfect, performant experiences.
              </Trans>
            </p>
            <p>
              <Trans>Shortly after graduating from{' '}</Trans> <a href="https://arras.cesi.fr/ecoles-formations/">{t("Exia Cesi School")}</a>
              {t(", I started as a Freelance and after I joined the engineering team at")}<a href="https://www.afibel.com/fr/">Afibel</a> <Trans>where I worked
              on a wide variety of interesting and meaningful projects on a daily basis.
              </Trans>
            </p>
            <p>
            {t("Graduated with a master's degree in IS from")} <a href="https://enigma-school.com/">{t("Enigma School")}</a>. {t("In particular, I worked on an end-of-study")} <a className="resume-text-button"
                href="/dissertation.pdf"
                target="_blank"
                rel="noopener noreferrer">{t("thesis")}</a> {t("concerning the development and management of an application in connected/disconnected mode to an ERP using WinDev.")}
            </p>
            <p>
              {t("Lately Web & ERP Developer")} - <a href="https://www.progiteam.fr/">Progiteam</a> - {t("Divalto ERP Integrator.")}
            </p>

            <p><Trans>Here are a few technologies I've been working with recently:</Trans></p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Img fluid={data.avatar.childImageSharp.fluid} alt="Avatar" className="img" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;