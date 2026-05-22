import React from 'react';
import { ThemeProvider } from './src/components/ThemeContext';
// import TranslationProvider from './src/layouts/TranslationProvider';

export const onRenderBody = ({ setPreBodyComponents }) => {
  // Script injecté de façon SYNCHRONE dans le HTML, avant que React hydrate.
  // Pas de remplacement de placeholder fragile : les valeurs sont écrites directement.
  setPreBodyComponents(
    <script
      key="theme-persist"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const saved = localStorage.getItem('color-mode');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const colorMode = (saved === 'dark' || saved === 'light')
                ? saved
                : (prefersDark ? 'dark' : 'light');
              document.documentElement.style.setProperty('--initial-color-mode', colorMode);
              document.documentElement.classList.add(colorMode);
            } catch(e) {}
          })()
        `,
      }}
    />,
  );
};

export const wrapRootElement = ({ element }) => <ThemeProvider>{element}</ThemeProvider>;

// export const wrapPageElement = ({ element, props }) => {
//   return <TranslationProvider element={element} {...props} />;
// };
