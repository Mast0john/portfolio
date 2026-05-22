import React from 'react';
import PropTypes from 'prop-types';

const isClient = typeof window !== 'undefined';

// Charge les bibliothèques UNIQUEMENT côté client
let motionLib = null;
let AnimatePresenceLib = null;
let TransitionGroupLib = null;
let CSSTransitionLib = null;

if (isClient) {
  motionLib = require('framer-motion').motion;
  AnimatePresenceLib = require('framer-motion').AnimatePresence;
  const rtg = require('react-transition-group');
  TransitionGroupLib = rtg.TransitionGroup;
  CSSTransitionLib = rtg.CSSTransition;
}

// Proxy pour motion
const safeMotion = new Proxy(
  {},
  {
    get: (_, tagName) => props => {
      if (!isClient || !motionLib) {
        const { children, as: Tag = tagName, ...rest } = props;
        // Liste des props spécifiques à Framer Motion à ignorer
        const motionProps = [
          'animate',
          'initial',
          'exit',
          'transition',
          'variants',
          'whileHover',
          'whileTap',
        ];
        // Filtre les props pour ne garder que celles qui ne sont pas dans motionProps
        const safeProps = Object.fromEntries(
          Object.entries(rest).filter(([key]) => !motionProps.includes(key)),
        );
        return React.createElement(Tag, safeProps, children);
      }
      return React.createElement(motionLib[tagName], props);
    },
  },
);

/// Composants React Transition Group
const SafeTransitionGroup = ({ children, ...props }) =>
  isClient && TransitionGroupLib ? (
    <TransitionGroupLib {...props}>{children}</TransitionGroupLib>
  ) : (
    <>{children}</>
  );

const SafeCSSTransition = ({ children, ...props }) =>
  isClient && CSSTransitionLib ? (
    <CSSTransitionLib {...props}>{children}</CSSTransitionLib>
  ) : (
    <>{children}</>
  );

SafeTransitionGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

SafeCSSTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  safeMotion as motion,
  AnimatePresenceLib as AnimatePresence,
  SafeTransitionGroup as TransitionGroup,
  SafeCSSTransition as CSSTransition,
};
