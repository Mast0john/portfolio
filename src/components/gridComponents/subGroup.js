import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import SkillCard from './skilCard';
import { Trans } from 'gatsby-plugin-react-i18next';

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

/* ─── Motion presets ───────────────────────────────────────── */
const springSnap = { type: 'spring', stiffness: 500, damping: 35 };
const ease = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

const stagger = (d = 0.06) => ({
  hidden: {},
  visible: { transition: { staggerChildren: d } },
});

const SubGroup = ({ groupName, items, color, selected, onSelect }) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ marginBottom: 14 }}>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ x: 3 }}
        transition={springSnap}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: open ? 10 : 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 0',
        }}>
        <motion.span
          animate={{ rotate: open ? 0 : -90 }}
          transition={springSnap}
          style={{
            fontSize: 10,
            color: C.muted,
            fontFamily: `'JetBrains Mono',monospace`,
            letterSpacing: 0.8,
            display: 'inline-block',
          }}>
          ▾
        </motion.span>
        <span
          style={{
            fontSize: 10,
            color: C.muted,
            fontFamily: `'JetBrains Mono',monospace`,
            letterSpacing: 0.8,
          }}>
          <Trans>{groupName}</Trans>
        </span>
        <span
          style={{
            fontSize: 9,
            color: `${C.muted}` + '80',
            fontFamily: `'JetBrains Mono',monospace`,
          }}>
          ({items.length})
        </span>
      </motion.button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="sg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { ...ease, duration: 0.28 }, opacity: { duration: 0.18 } }}
            style={{ overflow: 'hidden' }}>
            <motion.div
              variants={stagger(0.04)}
              initial="hidden"
              animate="visible"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                paddingBottom: 4,
                paddingLeft: 4,
                paddingTop: 10,
              }}>
              {items.map(item => (
                <SkillCard
                  key={item.name}
                  item={item}
                  color={color}
                  selected={selected}
                  onSelect={onSelect}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

SubGroup.displayName = 'SubGroup';

SubGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

SubGroup.defaultProps = {
  selected: null,
};

export default SubGroup;
