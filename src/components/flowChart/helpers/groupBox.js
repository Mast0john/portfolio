import React from 'react';
import PropTypes from 'prop-types';

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  bg: '#0d0d1a',
  card: '#1a1a2e',
  border: '#252540',
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
  muted: '#5a5a7a',
  text: '#e0e0f0',
};
const GroupBox = ({ x, y, w, h, label, color }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={12}
      fill={`${color}` + '08'}
      stroke={color}
      strokeWidth={1}
      strokeOpacity={0.3}
      strokeDasharray="4 3"
    />
    <rect x={x + 14} y={y - 10} width={label.length * 7.5 + 16} height={20} rx={4} fill={C.bg} />
    <text
      x={x + 22}
      y={y + 4}
      fontSize={10}
      fill={color}
      opacity={0.9}
      fontFamily="'JetBrains Mono',monospace"
      fontWeight={700}
      letterSpacing={1}>
      {label}
    </text>
  </g>
);

GroupBox.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

GroupBox.displayName = 'GroupBox';

export default GroupBox;
