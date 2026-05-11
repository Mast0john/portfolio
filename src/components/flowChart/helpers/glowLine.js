import React from 'react';
import PropTypes from 'prop-types';

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  purple: '#7c6fe0',
  purpleGlow: '#7c6fe033',
  cyan: '#00d4d4',
  cyanGlow: '#00d4d420',
  green: '#00c896',
  greenGlow: '#00c89620',
  orange: '#ff8c42',
  orangeGlow: '#ff8c4220',
  pink: '#e066a0',
  pinkGlow: '#e066a020',
  yellow: '#f5c842',
  yellowGlow: '#f5c84220',
  text: '#e0e0f0',
};
const GlowLine = ({ x1, y1, x2, y2, color = C.purple, dash = false }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeOpacity={0.15} strokeWidth={8} />
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeOpacity={0.5}
      strokeWidth={1.5}
      strokeDasharray={dash ? '6 4' : undefined}
    />
  </g>
);

GlowLine.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  dash: PropTypes.bool.isRequired,
};

GlowLine.displayName = 'GlowLine';

export default GlowLine;
