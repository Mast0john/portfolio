import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Trans, useI18next } from 'gatsby-plugin-react-i18next';
import NeonArrows from './../neonArrow/neonArrow';
import { LEFT_ARROWS, RIGHT_ARROWS } from './../neonArrow/constants';

const StyledAboutSection = styled.section`
  /* ─────────────────────────────── PARTICLES (arrière-plan) */
  #tsparticles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  max-width: 900px;
  position: relative;

  .inner {
    display: grid;
    grid-template-columns: 3fr 3fr;
    grid-gap: 50px;
    z-index: 10;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  margin: 0 auto;
  /* z-index: 1; // z-index de base */

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
    background-color: ${({ isHovered }) => (isHovered ? 'transparent' : 'var(--green)')};
    text-align: center;
    transition: all 0.35s ease;
    z-index: 1;

    &:hover,
    &:focus {
      background: transparent;

      &:after {
        content: '';
        position: absolute;
        top: ${({ isHovered }) => (isHovered ? '0' : '0')};
        left: ${({ isHovered }) => (isHovered ? '0' : '0')};
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: ${({ isHovered }) => (isHovered ? 'normal' : 'multiply')};
      filter: ${({ isHovered }) => (isHovered ? 'none' : 'grayscale(100%) contrast(1)')};
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

const Resume = () => {
  const data = useStaticQuery(graphql`
    query {
      en_cv_text: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "en_cv_text.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      fr_cv_text: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "fr_cv_text.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      en_cv_logo: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "en_cv_logo.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      fr_cv_logo: file(
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "fr_cv_logo.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  // styledPic
  const revealContainer = useRef(null);

  // neonArrows
  const leftCVRef = useRef(null); // Référence pour le CV gauche
  const rightCVRef = useRef(null); // Référence pour le CV droit
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [picDimensions, setPicDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 });

  // styledPic
  // Recadre le CV dans le rectangle stylisé
  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  // neonArrows
  // Mesure les dimensions des CVs avec un seul useEffect et une fonction partagée
  useEffect(() => {
    const measureDimensions = (ref, setDimensions) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
          x: rect.x,
          y: rect.y,
        });
      }
    };

    // Mesure initiale
    measureDimensions(leftCVRef, setPicDimensions);
    measureDimensions(rightCVRef, setPicDimensions);

    // Ajoute un ResizeObserver pour gérer les redimensionnements
    const resizeObserver = new ResizeObserver(() => {
      measureDimensions(leftCVRef, setPicDimensions);
      measureDimensions(rightCVRef, setPicDimensions);
    });

    if (leftCVRef.current) {
      resizeObserver.observe(leftCVRef.current);
    }
    if (rightCVRef.current) {
      resizeObserver.observe(rightCVRef.current);
    }

    // Nettoyage
    return () => {
      resizeObserver.disconnect();
    };
  }, []); // Tableau de dépendances vide = s'exécute une seule fois au montage

  const { language } = useI18next();

  return (
    <StyledAboutSection id="resume" ref={revealContainer}>
      <h2 className="numbered-heading">
        <Trans>Resume </Trans>
      </h2>
      <div className="inner">
        {/* CV avec Logo (gauche) */}
        <StyledPic
          ref={leftCVRef}
          isHovered={isLeftHovered}
          onMouseEnter={() => setIsLeftHovered(true)}
          onMouseLeave={() => setIsLeftHovered(false)}>
          {' '}
          <div className="wrapper">
            <a
              className="resume-text-button"
              href={
                language === 'fr'
                  ? '/%5BFR%5Dresume-logoed-version.pdf'
                  : '/%5BEN%5Dresume-logoed-version.pdf'
              }
              target="_blank"
              rel="noopener noreferrer">
              <Img
                fluid={
                  language === 'fr'
                    ? data.fr_cv_logo.childImageSharp.fluid
                    : data.en_cv_logo.childImageSharp.fluid
                }
                alt={language === 'fr' ? 'FR' : 'EN'}
                className="img"
              />
              <h1>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Logo </h1>
              {/* NeonArrows est positionné par rapport à StyledPic */}
              {picDimensions.width > 0 && (
                <NeonArrows
                  arrows={LEFT_ARROWS} // Les flèches démarrent de la gauche
                  width={picDimensions.width}
                  height={picDimensions.height}
                  top={0} // Position relative à StyledPic
                  left={0} // Position relative à StyledPic
                  hovered={isLeftHovered} // État d'hover spécifique
                  side="left" // Img de gauche
                />
              )}
            </a>
          </div>
        </StyledPic>
        {/* CV avec texte (droit) */}
        <StyledPic
          ref={rightCVRef}
          isHovered={isRightHovered}
          onMouseEnter={() => setIsRightHovered(true)}
          onMouseLeave={() => setIsRightHovered(false)}>
          {' '}
          <div className="wrapper">
            <a
              className="resume-text-button"
              href={
                language === 'fr'
                  ? '/%5BFR%5Dresume-text-version.pdf'
                  : '/%5BEN%5Dresume-text-version.pdf'
              }
              target="_blank"
              rel="noopener noreferrer">
              <Img
                fluid={
                  language === 'fr'
                    ? data.fr_cv_text.childImageSharp.fluid
                    : data.en_cv_text.childImageSharp.fluid
                }
                alt={language === 'fr' ? 'FR' : 'EN'}
                className="img"
              />
              <h1>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Text </h1>
              {/* NeonArrows est positionné par rapport à StyledPic */}
              {picDimensions.width > 0 && (
                <NeonArrows
                  arrows={RIGHT_ARROWS} // Les flèches démarrent de la droite
                  width={picDimensions.width}
                  height={picDimensions.height}
                  top={0}
                  left={0}
                  hovered={isRightHovered} // État d'hover spécifique
                  side="right" // Img de droite
                />
              )}
            </a>
          </div>
        </StyledPic>
        {/* <StyledPic>
          <div className="wrapper">
            <a
              className="resume-text-button"
              href="/%5BEN%5Dresume.pdf"
              target="_blank"
              rel="noopener noreferrer">
              <Img fluid={data.cv_en.childImageSharp.fluid} alt="EN" className="img" />
              <h1>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {t('Text')} </h1>
            </a>
          </div>
        </StyledPic> */}
      </div>
    </StyledAboutSection>
  );
};

export default Resume;
