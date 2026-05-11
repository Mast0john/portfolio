import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Arrow component
 * @param {Object} props - Props du composant
 * @param {string} props.shaft - Chemin SVG pour la hampe de la flèche
 * @param {string} props.head - Chemin SVG pour la tête de la flèche
 * @param {number} props.sD - Durée du shaft (s)
 * @param {number} props.sDelay - Délai avant le shaft (s)
 * @param {number} props.hD - Durée de la tête (s)
 * @param {boolean} props.hovered - Booléen pour déclencher l'animation
 * @param {Function} props.onAnimationComplete - Callback appelé à la fin de l'animation
 */
const Arrow = ({ shaft, head, sD, sDelay, hD, hovered, onAnimationComplete }) => {
  // La tête commence 60 ms avant la fin du shaft pour fluidité
  const headDelay = sDelay + sD - 0.06;

  const shaftVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: sD, delay: sDelay, ease: [0.3, 0.0, 0.7, 1.0] },
        opacity: { duration: 0.05, delay: sDelay },
      },
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' },
    },
  };

  const headVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: hD, delay: headDelay, ease: 'easeOut' },
        opacity: { duration: 0.01, delay: headDelay },
      },
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  const state = hovered ? 'visible' : 'exit';

  return (
    <g filter="url(#glow)">
      {/* Shaft */}
      <motion.path
        d={shaft}
        stroke="white"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        variants={shaftVariants}
        initial="hidden"
        animate={state}
        onAnimationComplete={onAnimationComplete}
      />
      {/* Arrowhead */}
      <motion.path
        d={head}
        stroke="white"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={headVariants}
        initial="hidden"
        animate={state}
      />
    </g>
  );
};

Arrow.propTypes = {
  shaft: PropTypes.any,
  head: PropTypes.any,
  sD: PropTypes.any,
  sDelay: PropTypes.any,
  hD: PropTypes.any,
  hovered: PropTypes.any,
  onAnimationComplete: PropTypes.func,
};

export default Arrow;
