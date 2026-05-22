// /**
//  * Implement Gatsby's Browser APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/browser-apis/
//  */

import React from 'react';
import { ThemeProvider } from './src/components/ThemeContext';
// import TranslationProvider from './src/layouts/TranslationProvider';

// Wrap the entire React tree with the dark-mode ThemeProvider so every
// component can access colorMode / setColorMode via useContext(ThemeContext).
export const wrapRootElement = ({ element }) => <ThemeProvider>{element}</ThemeProvider>;

// export const wrapPageElement = ({ element, props }) => (
//   <TranslationProvider element={element} {...props} />
// );

// Désactive les warnings de i18next (on gère nous-mêmes les traductions)
if (typeof window !== 'undefined') {
  window.___i18nextWarnings = false;
}
