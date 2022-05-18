import React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

class DarkLightSwitch extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => {
          const iconDarkLightSwitch =
            theme === 'light' ? 'fa fa-moon-o fa-2x' : 'fa fa-sun-o fa-2x';
          return (
            <>
              <i
                className={iconDarkLightSwitch}
                onClick={() => {
                  const nextTheme = theme === 'light' ? 'dark' : 'light';
                  toggleTheme(nextTheme);
                }}
              />
            </>
          );
        }}
      </ThemeToggler>
    );
  }
}

export default DarkLightSwitch;
