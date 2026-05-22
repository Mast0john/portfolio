import React from 'react';
import PropTypes from 'prop-types';

const COLOR_MODE_KEY = 'color-mode';
const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode';

// Safe default: prevents "cannot destructure undefined" if a component renders
// outside the Provider (e.g. during SSR hydration before wrapRootElement fires).
export const ThemeContext = React.createContext({
  colorMode: undefined,
  setColorMode: () => {},
});

export const ThemeProvider = ({ children }) => {
  // Lazy initializer: runs synchronously on first render, so colorMode is
  // NEVER undefined on the client. This prevents the "return null" guard in
  // DarkLightSwitch from hiding the button when the follow-up useEffect fails
  // to fire (e.g. during hot-reload or partial SSR hydration).
  const [colorMode, rawSetColorMode] = React.useState(() => {
    // During SSR window doesn't exist — return undefined and let the body
    // class already applied by gatsby-ssr.js handle the first paint.
    if (typeof window === 'undefined') {
      return undefined;
    }

    // 1. CSS prop injected by gatsby-ssr.js (fastest path, no flash)
    const fromCssProp = window.document.documentElement.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP,
    );
    if (fromCssProp === 'dark' || fromCssProp === 'light') {
      return fromCssProp;
    }

    // 2. Saved preference in localStorage
    const saved = localStorage.getItem(COLOR_MODE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }

    // 3. OS-level preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Keep the body class and CSS prop in sync whenever colorMode changes.
  // This also handles the first mount when gatsby-ssr.js didn't run
  // (e.g. gatsby develop without a full rebuild).
  React.useEffect(() => {
    if (!colorMode) {
      return;
    }
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(colorMode);
    window.document.documentElement.style.setProperty(INITIAL_COLOR_MODE_CSS_PROP, colorMode);
  }, [colorMode]);

  const setColorMode = React.useCallback(newValue => {
    localStorage.setItem(COLOR_MODE_KEY, newValue);
    // DOM sync (body class + CSS prop) is handled by the effect above.
    rawSetColorMode(newValue);
  }, []);

  const contextValue = React.useMemo(() => ({ colorMode, setColorMode }), [
    colorMode,
    setColorMode,
  ]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
