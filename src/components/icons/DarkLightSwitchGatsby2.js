import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SwitchWrapper = styled.div`
  position: relative;
  width: 62px;
  height: 32px;
  margin-right: 20px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
  }

  label {
    position: absolute;
    inset: 0;
    cursor: pointer;
    border-radius: 999px;
    transition: var(--transition);

    background: ${({ isDark }) => (isDark ? 'var(--light-navy)' : 'var(--lightest-slate)')};

    border: 1px solid var(--green);

    display: flex;
    align-items: center;
    padding: 4px;
  }

  .thumb {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transition: var(--transition);

    background: ${({ isDark }) => (isDark ? 'var(--green)' : 'var(--navy)')};

    transform: ${({ isDark }) => (isDark ? 'translateX(30px)' : 'translateX(0px)')};

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ isDark }) => (isDark ? 'var(--navy)' : 'var(--white)')};

    font-size: 12px;
  }

  label:hover {
    box-shadow: 0 0 0 4px var(--green-tint);
  }
`;

const DarkLightSwitch = ({ theme, toggleTheme, switchOn, switchOff }) => {
  const isDark = theme === 'dark';

  const handleToggle = () => {
    const nextTheme = isDark ? 'light' : 'dark';

    if (nextTheme === 'dark') {
      switchOn();
    } else {
      switchOff();
    }

    toggleTheme(nextTheme);
  };

  return (
    <SwitchWrapper isDark={isDark}>
      <input type="checkbox" id="theme-toggle" checked={isDark} onChange={handleToggle} />

      <label htmlFor="theme-toggle">
        <div className="thumb">{isDark ? '☀' : '☾'}</div>
      </label>
    </SwitchWrapper>
  );
};

DarkLightSwitch.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  toggleTheme: PropTypes.func.isRequired,
  switchOn: PropTypes.func.isRequired,
  switchOff: PropTypes.func.isRequired,
};

export default DarkLightSwitch;
