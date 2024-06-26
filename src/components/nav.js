import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection } from '@hooks';
import { Menu } from '@components';
import { IconLogo } from '@components/icons';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';
import useSound from 'use-sound';
import popUpOn from '../sounds/switch-on.mp3';
import popUpOff from '../sounds/switch-off.mp3';
import { Link, useI18next } from 'gatsby-plugin-react-i18next';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: var(--navy);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(10px);
  transition: var(--transition);

  ${props =>
    props.scrollDirection === 'up' &&
  !props.scrolledToTop &&
  css`
      height: var(--nav-scroll-height);
      transform: translateY(0px);
      background-color: rgba(10, 25, 47, 0.85);
      box-shadow: 0 10px 30px -10px var(--navy-shadow);
    `};

  ${props =>
    props.scrollDirection === 'down' &&
  !props.scrolledToTop &&
  css`
      height: var(--nav-scroll-height);
      transform: translateY(calc(var(--nav-scroll-height) * -1));
      box-shadow: 0 10px 30px -10px var(--navy-shadow);
    `};

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--green);
      width: 42px;
      height: 42px;

      &:hover,
      &:focus {
        svg {
          fill: var(--green-tint);
        }
      }

      svg {
        fill: none;
        transition: var(--transition);
        user-select: none;
      }
    }
  }

  li {
      list-style-type: none
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--green);
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }
    }
  }

  .resume-text {
    ${({ theme }) => theme.mixins.customCtaButtonText};
    margin-left: 15px;
    margin-right: 15px;
    font-size: var(--fz-xs);
  }

  .resume-text-button {
    ${({ theme }) => theme.mixins.textButton};
    font-size: var(--fz-xs);
  }

  .resume-text {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }

  .resume-pipe {
    margin-left: 5px;
    margin-right: 5px;
    font-size: var(--fz-xs);
  }
`;

const Nav = ({ isHome }) => {
  const {languages, originalPath} = useI18next();
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const [switchOn] = useSound(popUpOn, { volume: 0.25 });
  const [switchOff] = useSound(popUpOff, { volume: 0.25 });

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <div className="logo" tabIndex="-1">
                {isHome ? (
                  <a href="/" aria-label="home">
                    <IconLogo />
                  </a>
                ) : (
                  <Link to="/" aria-label="home">
                    <IconLogo />
                  </Link>
                )}
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
        <StyledLinks>
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <div className={'dark-button'}>
                <input type={'checkbox'}
                  id={'toggle'}
                  onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light') && setIsChecked(isChecked)}
                  checked={theme === 'dark'}
                  onClick={() => {
                    const switchLight = theme === 'dark' ? switchOn() : switchOff();
                    toggleTheme(switchLight);
                  }}
                />
                <label htmlFor={'toggle'}>
                </label>
              </div>
            )}
          </ThemeToggler>
          <ol>
            <TransitionGroup component={null}>
              {isMounted &&
              navLinks &&
              navLinks.map(({ url, name }, i) => (
                <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                  <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                    <Link to={url}>{name}</Link>
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ol>
          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                  <p className="resume-text">
                    {languages.map(lng => (
                      <li key={lng}>
                        <Link 
                              className="resume-text-button" 
                              to={originalPath} language={lng}>
                          {lng}
                        </Link>
                        <label className="resume-pipe">
                          |
                        </label>
                      </li>
                    ))}
                    {/*rel="noopener noreferrer"*/}
                  </p>
                </div>
              </CSSTransition>
            )}
          </TransitionGroup>
        </StyledLinks>

        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames={fadeClass} timeout={timeout}>
              <Menu />
            </CSSTransition>
          )}
        </TransitionGroup>
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
