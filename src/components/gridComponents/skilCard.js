import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Img from 'gatsby-image';
import { Trans } from 'gatsby-plugin-react-i18next';

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  bg: '#0d0d1a',
  surface: '#12121f',
  // card: '#1a1a2e',
  card: '#233554',
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
  textDim: '#8888aa',
};

/* ─── Motion presets ───────────────────────────────────────── */
const spring = { type: 'spring', stiffness: 380, damping: 28 };
const springSnap = { type: 'spring', stiffness: 500, damping: 35 };

const cardV = {
  hidden: { opacity: 0, scale: 0.82, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: spring },
};

const SkillCard = ({ item, color, selected, onSelect }) => {
  const isActive = item.infoKey && selected === item.infoKey;
  const logoUrl = item.slug
    ? `https://cdn.simpleicons.org/${item.slug}/${item.hex || 'ffffff'}`
    : null;
  const logo = item.logo ? (
    <Img
      fluid={item.logo.childImageSharp.fluid}
      alt={item.name ? item.name : null}
      style={{ width: 30, height: 30, objectFit: 'contain' }}
    />
  ) : null;

  return (
    <motion.div
      variants={cardV}
      whileHover={
        item.infoKey
          ? { y: -6, scale: 1.06, boxShadow: `0 12px 32px ${color}35`, borderColor: color }
          : { y: -3, scale: 1.03 }
      }
      whileTap={item.infoKey ? { scale: 0.95 } : {}}
      animate={
        isActive
          ? {
            borderColor: color,
            boxShadow: `0 0 22px ${color}55, 0 8px 24px ${color}25`,
            background: `${color}18`,
          }
          : { background: C.card }
      }
      transition={spring}
      onClick={() => item.infoKey && onSelect(isActive ? null : item.infoKey)}
      style={{
        border: `1px solid ${isActive ? color : C.border}`,
        borderTop: `3px solid ${color}`,
        borderRadius: 10,
        padding: '14px 10px 12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7,
        minWidth: 90,
        maxWidth: 112,
        cursor: item.infoKey ? 'pointer' : 'default',
        position: 'relative',
      }}>
      {isActive && (
        <motion.div
          layoutId={`dot-${item.infoKey}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={springSnap}
          style={{
            position: 'absolute',
            top: 5,
            right: 6,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      )}
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={item.name}
          style={{ width: 30, height: 30, objectFit: 'contain' }}
        />
      ) : logo ? (
        logo
      ) : (
        <span style={{ fontSize: 26 }}>{item.emoji || '🔧'}</span>
      )}
      <span
        style={{
          fontSize: 10,
          color: C.text,
          textAlign: 'center',
          fontFamily: `'JetBrains Mono',monospace`,
          lineHeight: 1.35,
        }}>
        <Trans>{item.name}</Trans>
      </span>
      {item.sublabel && (
        <span style={{ fontSize: 8.5, color: C.textDim, textAlign: 'center', lineHeight: 1.3 }}>
          <Trans>{item.sublabel}</Trans>
        </span>
      )}
    </motion.div>
  );
};

SkillCard.displayName = 'SkillCard';

SkillCard.propTypes = {
  item: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

SkillCard.defaultProps = {
  selected: null,
};

export default SkillCard;
