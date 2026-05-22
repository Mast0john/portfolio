import React from 'react';
import PropTypes from 'prop-types';

const DarkLightSwitch = ({ theme, toggleTheme, switchOn, switchOff }) => {
  // const iconClass = theme === 'light' ? 'fa fa-moon-o fa-2x' : 'fa fa-sun-o fa-2x';

  const buttonClass = theme === 'dark' ? 'dark-button' : 'light-button';
  const iconClass = theme === 'light' ? 'fa fa-moon-o' : 'fa fa-sun-o'; // Sans la taille (fa-2x)
  // const [isChecked, setIsChecked] = useState(theme === 'dark');

  // // Synchronise isChecked avec le thème global
  // useEffect(() => {
  //   setIsChecked(theme === 'dark');
  // }, [theme]);

  const handleToggle = () => {
    // const nextTheme = e.target.checked ? 'dark' : 'light';
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    if (nextTheme === 'dark') {
      switchOn();
    } else {
      switchOff();
    }
    // setIsChecked(e.target.checked);
    toggleTheme(nextTheme);
  };

  return (
    // <i className={iconClass} type="checkbox" id="theme-toggle" onClick={handleToggle} />
    <div className={buttonClass}>
      <input type="checkbox" id="theme-toggle" onChange={handleToggle} checked={theme === 'dark'} />
      <label htmlFor="theme-toggle">
        <i className={iconClass} aria-hidden="true"></i> {/* Icône à l'intérieur du label */}
      </label>
    </div>
  );
};

DarkLightSwitch.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  toggleTheme: PropTypes.func.isRequired,
  switchOn: PropTypes.func.isRequired,
  switchOff: PropTypes.func.isRequired,
};

export default DarkLightSwitch;
