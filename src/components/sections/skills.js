import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import { KEY_CODES } from '@utils';
import sr from '@utils/sr';
import Img from 'gatsby-image';
import Masonry from 'react-masonry-css';

const StyledSkillsSection = styled.section`
  max-width: 1000px;

  .inner {
    display: block;
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 20px 20px 20px;
    position: relative;
    align-items: center;
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  display: flex;
  overflow-x: auto;
  width: calc(100% + 100px);
  margin-left: -50px;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    width: calc(100% + 50px);
    margin-left: -25px;
  }

  li {
    &:first-of-type {
        margin-left: 50px;
        @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
        padding-right: 50px;
        @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? 'var(--green)' : 'var(--slate)')};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  padding: 0 15px 2px;

  ${({ theme }) => theme.mixins.flexCenter};
  min-width: 120px;
  padding: 0 15px;
  border-left: 0;
  border-bottom: 2px solid var(--lightest-navy);
  text-align: center;

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTabId }) => activeTabId} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 11600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-v-width);
    height: 2px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-v-width)));
  }

  @media (max-width: 1150px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    transform: translateX(calc(${({ activeTabId }) => activeTabId} * var(--tab-width)));
  }
`;

const StyledHighlightDesign = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTab2Id }) => activeTab2Id} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 11600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-v-design-width);
    height: 2px;
    transform: translateX(calc(${({ activeTab2Id }) => activeTab2Id} * var(--tab-v-design-width)));
  }

  @media (max-width: 1150px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    transform: translateX(calc(${({ activeTab2Id }) => activeTab2Id} * var(--tab-width)));
  }
`;

const StyledHighlightLanguages = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(calc(${({ activeTab3Id }) => activeTab3Id} * var(--tab-height)));
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 11600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-v-languages-width);
    height: 2px;
    transform: translateX(calc(${({ activeTab3Id }) => activeTab3Id} * var(--tab-v-languages-width)));
  }

  @media (max-width: 1150px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-v-min-languages-width);
    height: 2px;
    transform: translateX(calc(${({ activeTab3Id }) => activeTab3Id} * var(--tab-v-min-languages-width)));
  }
`;

const StyledTabPanels = styled.div`
  margin-left: 20px;
  margin-left: 0;

`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  .my-masonry-grid {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-left: -30px;
  width: auto;
  background-color: transparent;
  }
  .my-masonry-grid_column {
    padding-left: 30px;
    background-clip: padding-box;
    background-color: transparent;
    @media (max-width: 768px) {
      height: 100%;
    }
  }

  .my-masonry-grid_column > div {
    margin-bottom: 30px;
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .category {
      color: var(--green);
    }
  }

  .txtlogo {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    text-align: center;
  }

  .skill-image {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      height: 100%;
      width: 33%;
    }

    a {
      width: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(80%);
      }
    }
  }
`;


const Skills = () => {
  const data = useStaticQuery(graphql`
    query {
      devSkills: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/skills/dev/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              logo1 {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo2 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo3 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo4 {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo5 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo6 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo7 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo8 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo9 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo10 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              txtlogo1
              txtlogo2
              txtlogo3
              txtlogo4
              txtlogo5
              txtlogo6
              txtlogo7
              txtlogo8
              txtlogo9
              txtlogo10
              url1
              url2
              url3
              url4
              url5
              url6
              url7
              url8
              url9
              url10
              category
            }
            html
          }
        }
      }
      designSkills: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/skills/design/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              logo1 {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo2 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo3 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo4 {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo5 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo6 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo7 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              txtlogo1
              txtlogo2
              txtlogo3
              txtlogo4
              txtlogo5
              txtlogo6
              txtlogo7
              url1
              url2
              url3
              url4
              url5
              url6
              url7
              category
            }
            html
          }
        }
      }
      languagesSkills: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/skills/languages/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              logo1 {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo2 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              logo3 {
                childImageSharp {
                  fluid(quality: 100)  {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              txtlogo1
              txtlogo2
              txtlogo3
              category
            }
            html
          }
        }
      }
    }
  `);

  const devSkillsData = data.devSkills.edges;
  const designSkillsData = data.designSkills.edges;
  const languagesSkillsData = data.languagesSkills.edges;

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const [activeTab2Id, setActiveTab2Id] = useState(0);
  const [tab2Focus, setTab2Focus] = useState(null);
  const tabs2 = useRef([]);
  const [activeTab3Id, setActiveTab3Id] = useState(0);
  const [tab3Focus, setTab3Focus] = useState(null);
  const tabs3 = useRef([]);

  const [showMoreDev, setShowMoreDev] = useState(true);
  const [showMoreDesign, setShowMoreDesign] = useState(false);
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);

  const displayDev = {
    display: showMoreDev ? 'flex' : 'none',
  };

  const displayDesign = {
    display: showMoreDesign ? 'flex' : 'none',
  };

  const displayLanguages = {
    display: showMoreLanguages ? 'flex' : 'none',
  };

  const skillsDevToShow = showMoreDev ? devSkillsData : '';
  const skillsDesignToShow = showMoreDesign ? designSkillsData : '' && !showMoreDev && !showMoreLanguages;
  const skillsLanguagesToShow = showMoreLanguages ? languagesSkillsData : '' && !showMoreDev && !showMoreDesign;

  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };
  const focusTab2 = () => {
    if (tabs2.current[tab2Focus]) {
      tabs2.current[tab2Focus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tab2Focus >= tabs2.current.length) {
      setTab2Focus(0);
    }
    // If we're at the start, move to the end
    if (tab2Focus < 0) {
      setTab2Focus(tabs2.current.length - 1);
    }
  };
  const focusTab3 = () => {
    if (tabs3.current[tab3Focus]) {
      tabs3.current[tab3Focus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tab3Focus >= tabs3.current.length) {
      setTab3Focus(0);
    }
    // If we're at the start, move to the end
    if (tab3Focus < 0) {
      setTab3Focus(tabs3.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);
  useEffect(() => focusTab2(), [tab2Focus]);
  useEffect(() => focusTab3(), [tab3Focus]);

  // Focus on tabs when using up & down arrow keys
  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus(tabFocus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus(tabFocus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };
  const onKeyDown2 = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTab2Focus(tab2Focus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTab2Focus(tab2Focus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };
  const onKeyDown3 = e => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTab3Focus(tab3Focus - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTab3Focus(tab3Focus + 1);
        break;
      }

      default: {
        break;
      }
    }
  };

  const breakpointColumnsObj = {
    default: 8,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills</h2>

      <div className="inner">

        <button className="more-button" onClick={() => setShowMoreDev(!showMoreDev)}>
          {showMoreDev ? '-' : '+'} Development
        </button>
        <button className="more-button" onClick={() => setShowMoreDesign(!showMoreDesign)}>
          {showMoreDesign ? '-' : '+'} Design
        </button>
        <button className="more-button" onClick={() => setShowMoreLanguages(!showMoreLanguages)}>
          {showMoreLanguages ? '-' : '+'} Languages
        </button>

        <StyledTabList style={displayDev} role="tablist" aria-label="Skill tabs" onKeyDown={e => onKeyDown(e)}>
          {skillsDevToShow &&
              skillsDevToShow.map(({ node }, i) => {
                const { category } = node.frontmatter;
                return (
                  <StyledTabButton
                    key={i}
                    isActive={activeTabId === i}
                    onClick={() => setActiveTabId(i)}
                    ref={el => (tabs.current[i] = el)}
                    id={`tab-${i}`}
                    role="tab"
                    tabIndex={activeTabId === i ? '0' : '-1'}
                    aria-selected={activeTabId === i ? true : false}
                    aria-controls={`panel-${i}`}>
                    <span>{category}</span>
                  </StyledTabButton>
                );
              })}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>
        <StyledTabPanels style={displayDev}>
          {skillsDevToShow &&
          skillsDevToShow.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11,
              txtlogo1, txtlogo2, txtlogo3, txtlogo4, txtlogo5, txtlogo6, txtlogo7, txtlogo8, txtlogo9, txtlogo10, txtlogo11,
              url1, url2, url3, url4, url5, url6, url7, url8, url9, url10, url11 } = frontmatter;

            // Some exemples logos. If haven't logos of skills, nothing appeared
            const logoSkill1 = logo1 ? (
              <div className="skill-image">
                <a href={url1 ? url1 : '#'}>
                  <Img fluid={logo1.childImageSharp.fluid} alt={txtlogo1 ? txtlogo1 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo1 ? txtlogo1 : ''}</p>
              </div>
            ) : ('');
            const logoSkill2 = logo2 ? (
              <div className="skill-image">
                <a href={url2 ? url2 : '#'}>
                  <Img fluid={logo2.childImageSharp.fluid} alt={txtlogo2 ? txtlogo2 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo2 ? txtlogo2 : ''}</p>
              </div>
            ) : ('');
            const logoSkill3 = logo3 ? (
              <div className="skill-image">
                <a href={url3 ? url3 : '#'}>
                  <Img fluid={logo3.childImageSharp.fluid} alt={txtlogo3 ? txtlogo3 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo3 ? txtlogo3 : ''}</p>
              </div>
            ) : ('');
            const logoSkill4 = logo4 ? (
              <div className="skill-image">
                <a href={url4 ? url4 : '#'}>
                  <Img fluid={logo4.childImageSharp.fluid} alt={txtlogo4 ? txtlogo4 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo4 ? txtlogo4 : ''}</p>
              </div>
            ) : ('');
            const logoSkill5 = logo5 ? (
              <div className="skill-image">
                <a href={url5 ? url5 : '#'}>
                  <Img fluid={logo5.childImageSharp.fluid} alt={txtlogo5 ? txtlogo5 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo5 ? txtlogo5 : ''}</p>
              </div>
            ) : ('');
            const logoSkill6 = logo6 ? (
              <div className="skill-image">
                <a href={url6 ? url6 : '#'}>
                  <Img fluid={logo6.childImageSharp.fluid} alt={txtlogo6 ? txtlogo6 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo6 ? txtlogo6 : ''}</p>
              </div>
            ) : ('');
            const logoSkill7 = logo7 ? (
              <div className="skill-image">
                <a href={url7 ? url7 : '#'}>
                  <Img fluid={logo7.childImageSharp.fluid} alt={txtlogo7 ? txtlogo7 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo7 ? txtlogo7 : ''}</p>
              </div>
            ) : ('');
            const logoSkill8 = logo8 ? (
              <div className="skill-image">
                <a href={url8 ? url8 : '#'}>
                  <Img fluid={logo8.childImageSharp.fluid} alt={txtlogo8 ? txtlogo8 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo8 ? txtlogo8 : ''}</p>
              </div>
            ) : ('');
            const logoSkill9 = logo9 ? (
              <div className="skill-image">
                <a href={url9 ? url9 : '#'}>
                  <Img fluid={logo9.childImageSharp.fluid} alt={txtlogo9 ? txtlogo9 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo9 ? txtlogo9 : ''}</p>
              </div>
            ) : ('');
            const logoSkill10 = logo10 ? (
              <div className="skill-image">
                <a href={url10 ? url10 : '#'}>
                  <Img fluid={logo10.childImageSharp.fluid} alt={txtlogo10 ? txtlogo10 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo10 ? txtlogo10 : ''}</p>
              </div>
            ) : ('');
            const logoSkill11 = logo11 ? (
              <div className="skill-image">
                <a href={url11 ? url11 : '#'}>
                  <Img fluid={logo11.childImageSharp.fluid} alt={txtlogo11 ? txtlogo11 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo11 ? txtlogo11 : ''}</p>
              </div>
            ) : ('');

            return (
              <CSSTransition key={i} in={activeTabId === i} timeout={250} classNames="fade">
                <StyledTabPanel
                  id={`panel-${i}`}
                  role="tabpanel"
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-labelledby={`tab-${i}`}
                  aria-hidden={activeTabId !== i}
                  hidden={activeTabId !== i}>

                  <Masonry breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {logoSkill1}{logoSkill2}{logoSkill3}{logoSkill4}{logoSkill5}
                    {logoSkill6}{logoSkill7}{logoSkill8}{logoSkill9}{logoSkill10}
                    {logoSkill11}
                  </Masonry>

                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </StyledTabPanel>
              </CSSTransition>
            );
          })}
        </StyledTabPanels>

        <StyledTabList style={displayDesign} role="tablist" aria-label="Skill Design tabs" onKeyDown={e => onKeyDown2(e)}>
          {skillsDesignToShow &&
          skillsDesignToShow.map(({ node }, j) => {
            const { category } = node.frontmatter;
            return (
              <StyledTabButton
                key={j}
                isActive={activeTab2Id === j}
                onClick={() => setActiveTab2Id(j)}
                ref={el => (tabs2.current[j] = el)}
                id={`tab-${j}`}
                role="tab"
                tabIndex={activeTab2Id === j ? '0' : '-1'}
                aria-selected={activeTab2Id === j ? true : false}
                aria-controls={`panel-${j}`}>
                <span>{category}</span>
              </StyledTabButton>
            );
          })}
          <StyledHighlightDesign activeTab2Id={activeTab2Id} />
        </StyledTabList>
        <StyledTabPanels style={displayDesign}>
          {skillsDesignToShow &&
          skillsDesignToShow.map(({ node }, j) => {
            const { frontmatter, html } = node;
            const { logo1, logo2, logo3, logo4, logo5, logo6, logo7,
              txtlogo1, txtlogo2, txtlogo3, txtlogo4, txtlogo5, txtlogo6, txtlogo7,
              url1, url2, url3, url4, url5, url6, url7 } = frontmatter;

            // Some exemples logos. If haven't logos of skills, nothing appeared
            const logoSkill1 = logo1 ? (
              <div className="skill-image">
                <a href={url1 ? url1 : '#'}>
                  <Img fluid={logo1.childImageSharp.fluid} alt={txtlogo1 ? txtlogo1 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo1 ? txtlogo1 : ''}</p>
              </div>
            ) : ('');
            const logoSkill2 = logo2 ? (
              <div className="skill-image">
                <a href={url2 ? url2 : '#'}>
                  <Img fluid={logo2.childImageSharp.fluid} alt={txtlogo2 ? txtlogo2 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo2 ? txtlogo2 : ''}</p>
              </div>
            ) : ('');
            const logoSkill3 = logo3 ? (
              <div className="skill-image">
                <a href={url3 ? url3 : '#'}>
                  <Img fluid={logo3.childImageSharp.fluid} alt={txtlogo3 ? txtlogo3 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo3 ? txtlogo3 : ''}</p>
              </div>
            ) : ('');
            const logoSkill4 = logo4 ? (
              <div className="skill-image">
                <a href={url4 ? url4 : '#'}>
                  <Img fluid={logo4.childImageSharp.fluid} alt={txtlogo4 ? txtlogo4 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo4 ? txtlogo4 : ''}</p>
              </div>
            ) : ('');
            const logoSkill5 = logo5 ? (
              <div className="skill-image">
                <a href={url5 ? url5 : '#'}>
                  <Img fluid={logo5.childImageSharp.fluid} alt={txtlogo5 ? txtlogo5 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo5 ? txtlogo5 : ''}</p>
              </div>
            ) : ('');
            const logoSkill6 = logo6 ? (
              <div className="skill-image">
                <a href={url6 ? url6 : '#'}>
                  <Img fluid={logo6.childImageSharp.fluid} alt={txtlogo6 ? txtlogo6 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo6 ? txtlogo6 : ''}</p>
              </div>
            ) : ('');
            const logoSkill7 = logo7 ? (
              <div className="skill-image">
                <a href={url7 ? url7 : '#'}>
                  <Img fluid={logo7.childImageSharp.fluid} alt={txtlogo7 ? txtlogo7 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo7 ? txtlogo7 : ''}</p>
              </div>
            ) : ('');

            return (
              <CSSTransition key={j} in={activeTab2Id === j} timeout={250} classNames="fade">
                <StyledTabPanel
                  id={`panel-${j}`}
                  role="tabpanel"
                  tabIndex={activeTab2Id === j ? '0' : '-1'}
                  aria-labelledby={`tab-${j}`}
                  aria-hidden={activeTab2Id !== j}
                  hidden={activeTab2Id !== j}>

                  <Masonry breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {logoSkill1}{logoSkill2}{logoSkill3}{logoSkill4}{logoSkill5}
                    {logoSkill6}{logoSkill7}
                  </Masonry>

                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </StyledTabPanel>
              </CSSTransition>
            );
          })}
        </StyledTabPanels>

        <StyledTabList style={displayLanguages} role="tablist" aria-label="Skill Languages tabs" onKeyDown={e => onKeyDown3(e)}>
          {skillsLanguagesToShow &&
            skillsLanguagesToShow.map(({ node }, k) => {
              const { category } = node.frontmatter;
              return (
                <StyledTabButton
                  key={k}
                  isActive={activeTab3Id === k}
                  onClick={() => setActiveTab3Id(k)}
                  ref={el => (tabs3.current[k] = el)}
                  id={`tab-${k}`}
                  role="tab"
                  tabIndex={activeTab3Id === k ? '0' : '-1'}
                  aria-selected={activeTab3Id === k ? true : false}
                  aria-controls={`panel-${k}`}>
                  <span>{category}</span>
                </StyledTabButton>
              );
            })}
          <StyledHighlightLanguages activeTab3Id={activeTab3Id}/>
        </StyledTabList>
        <StyledTabPanels style={displayLanguages }>
          {skillsLanguagesToShow &&
          skillsLanguagesToShow.map(({ node }, k) => {
            const { frontmatter, html } = node;
            const { logo1, logo2, logo3, txtlogo1, txtlogo2, txtlogo3 } = frontmatter;

            // Some exemples logos. If haven't logos of skills, nothing appeared
            const logoSkill1 = logo1 ? (
              <div className="skill-image">
                <a href={'#'}>
                  <Img fluid={logo1.childImageSharp.fluid} alt={txtlogo1 ? txtlogo1 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo1 ? txtlogo1 : ''}</p>
              </div>
            ) : ('');
            const logoSkill2 = logo2 ? (
              <div className="skill-image">
                <a href={'#'}>
                  <Img fluid={logo2.childImageSharp.fluid} alt={txtlogo2 ? txtlogo2 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo2 ? txtlogo2 : ''}</p>
              </div>
            ) : ('');
            const logoSkill3 = logo3 ? (
              <div className="skill-image">
                <a href={'#'}>
                  <Img fluid={logo3.childImageSharp.fluid} alt={txtlogo3 ? txtlogo3 : ''} className="img" />
                </a>
                <p className="txtlogo">{txtlogo3 ? txtlogo3 : ''}</p>
              </div>
            ) : ('');

            return (
              <CSSTransition key={k} in={activeTab3Id === k} timeout={250} classNames="fade">
                <StyledTabPanel
                  id={`panel-${k}`}
                  role="tabpanel"
                  tabIndex={activeTab3Id === k ? '0' : '-1'}
                  aria-labelledby={`tab-${k}`}
                  aria-hidden={activeTab3Id !== k}
                  hidden={activeTab3Id !== k}>

                  <Masonry breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                    {logoSkill1}{logoSkill2}{logoSkill3}
                  </Masonry>

                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </StyledTabPanel>
              </CSSTransition>
            );
          })}
        </StyledTabPanels>
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
