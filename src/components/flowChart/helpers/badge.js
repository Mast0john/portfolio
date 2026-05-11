import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'gatsby-plugin-react-i18next';

const Badge = ({ w, x, y, label, color }) => {
  const width = w ?? label.length * 6.5 + 16;

  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 10}
        width={width}
        height={20}
        rx={10}
        fill={`${color}25`}
        stroke={color}
        strokeWidth={0.8}
        strokeOpacity={0.7}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize={9}
        fill={color}
        fontFamily="'JetBrains Mono', monospace"
        fontWeight={700}
        letterSpacing={0.8}>
        <Trans>{label}</Trans>
      </text>
    </g>
  );
};

Badge.propTypes = {
  w: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

Badge.displayName = 'Badge';

export default Badge;
