import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'gatsby-plugin-react-i18next';

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
  muted: '#5a5a7a',
  text: '#e0e0f0',
};

/* ─── Arrow helper ─────────────────────────────────────────── */
const Arrow = ({ x1, y1, x2, y2, color = C.purple, label, animated = true }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const ax = x2 - ux * 10;
  const ay = y2 - uy * 10;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return (
    <g>
      <line x1={x1} y1={y1} x2={ax} y2={ay} stroke={color} strokeOpacity={0.15} strokeWidth={6} />
      <line
        x1={x1}
        y1={y1}
        x2={ax}
        y2={ay}
        stroke={color}
        strokeOpacity={0.75}
        strokeWidth={1.5}
        strokeDasharray={animated ? '5 4' : undefined}>
        {animated && (
          <animate
            attributeName="stroke-dashoffset"
            from="18"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </line>
      <polygon
        points={`${x2},${y2} ${ax - uy * 5},${ay + ux * 5} ${ax + uy * 5},${ay - ux * 5}`}
        fill={color}
        fillOpacity={0.9}
      />
      {label && (
        <text
          x={mx + 7}
          y={my - 6}
          fontSize={9}
          fill={color}
          opacity={0.9}
          fontFamily="'JetBrains Mono',monospace">
          <Trans>{label}</Trans>
        </text>
      )}
    </g>
  );
};

Arrow.propTypes = {
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  animated: PropTypes.bool.isRequired,
};

Arrow.displayName = 'Arrow';

export default Arrow;
