import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Arrow from './arrow';
import PropTypes from 'prop-types';
import { getArrows } from './constants';

const NeonArrows = ({ width, height, top = 0, left = 0, onHoverChange, side = 'left' }) => {
  const [hovered, setHovered] = useState(false);
  const { LEFT_ARROWS, RIGHT_ARROWS } = getArrows(width, height);
  const arrows = side === 'left' ? LEFT_ARROWS : RIGHT_ARROWS;

  // Rectangle dynamique
  const dynamicR = { x: 0, y: 0, w: width, h: height };

  // Ticks aux coins
  const CORNER_PATHS = [
    `M ${dynamicR.x + 12},${dynamicR.y} L ${dynamicR.x},${dynamicR.y} L ${dynamicR.x},${dynamicR.y +
      12}`,
    `M ${dynamicR.x + dynamicR.w - 12},${dynamicR.y} L ${dynamicR.x + dynamicR.w},${
      dynamicR.y
    } L ${dynamicR.x + dynamicR.w},${dynamicR.y + 12}`,
    `M ${dynamicR.x},${dynamicR.y + dynamicR.h - 12} L ${dynamicR.x},${dynamicR.y +
      dynamicR.h} L ${dynamicR.x + 12},${dynamicR.y + dynamicR.h}`,
    `M ${dynamicR.x + dynamicR.w},${dynamicR.y + dynamicR.h - 12} L ${dynamicR.x +
      dynamicR.w},${dynamicR.y + dynamicR.h} L ${dynamicR.x + dynamicR.w - 12},${dynamicR.y +
      dynamicR.h}`,
  ];

  // Notifier le parent quand le hover change
  const handleHoverChange = isHovered => {
    setHovered(isHovered);
    if (onHoverChange) {
      onHoverChange(isHovered);
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        userSelect: 'none',
        zIndex: 10, // Toujours au-dessus de StyledPic
        pointerEvents: 'none',
      }}>
      <div
        onMouseEnter={() => handleHoverChange(true)}
        onMouseLeave={() => handleHoverChange(false)}
        style={{ width: '100%', height: '100%' }}>
        <svg
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'auto',
          }}>
          <defs>
            <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="b2" />
              <feMerge>
                <feMergeNode in="b1" />
                <feMergeNode in="b2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="rectGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rectangle */}
          <motion.rect
            x={dynamicR.x}
            y={dynamicR.y}
            width={dynamicR.w}
            height={dynamicR.h}
            rx="3"
            fill={'none'}
            stroke="rgba(255,255,255,0.30)"
            strokeWidth="1.5"
            filter="url(#rectGlow)"
            animate={{
              stroke: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.30)',
            }}
            transition={{ duration: 0.35 }}
            style={{ pointerEvents: 'none' }}
          />

          {/* Ticks des coins */}
          {CORNER_PATHS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              fill="none"
              filter="url(#glow)"
              animate={{ opacity: hovered ? 1 : 0.25 }}
              transition={{ duration: 0.3 }}
            />
          ))}

          {/* Flèches */}
          {arrows.map((arrow, i) => (
            <Arrow key={i} {...arrow} hovered={hovered} width={width} height={height} />
          ))}
        </svg>
      </div>
    </div>
  );
};

NeonArrows.propTypes = {
  arrows: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number,
  left: PropTypes.number,
  onHoverChange: PropTypes.func,
  hovered: PropTypes.bool.isRequired,
  side: PropTypes.string,
};

export default NeonArrows;
