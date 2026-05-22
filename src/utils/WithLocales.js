import React from 'react';

export const WithLocales = ({ children, data }) => 
  // 👇 Passe data.locales à tous les enfants
  React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { locales: data.locales });
    }
    return child;
  })
;
