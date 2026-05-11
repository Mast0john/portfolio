import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import DetailPanel from '../Panel/detailPanel';
import SubGroup from './subGroup';
import { Trans } from 'gatsby-plugin-react-i18next';

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  card: '#1a1a2e',
  border: '#252540',
  muted: '#5a5a7a',
};

/* ─── Motion presets ───────────────────────────────────────── */
const springSnap = { type: 'spring', stiffness: 500, damping: 35 };
const ease = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

const CategoryBlock = ({ name, catData, SKILL_INFO }) => {
  const [open, setOpen] = useState(true);
  const [selectedKey, setSelectedKey] = useState(null);
  const { color, icon, groups } = catData;
  const totalItems = Object.values(groups).flat().length;

  return (
    <motion.div
      layout
      transition={ease}
      style={{
        marginBottom: 16,
        border: `1px solid ${open ? `${color}35` : C.border}`,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
      {/* ── Header : toggle seulement, pas de navigation ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ backgroundColor: `${color}12` }}
        transition={{ duration: 0.15 }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 18px',
          background: open ? `${color}0b` : C.card,
          border: 'none',
          borderBottom: open ? `1px solid ${color}20` : 'none',
          cursor: 'pointer',
        }}>
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
          transition={{ duration: 0.4 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: `linear-gradient(135deg,${color}40,${color}15)`,
            border: `1px solid ${color}50`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            flexShrink: 0,
          }}>
          {icon}
        </motion.div>

        <div style={{ flex: 1, textAlign: 'left' }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color,
              fontFamily: `'JetBrains Mono',monospace`,
              letterSpacing: 1,
            }}>
            <Trans>{name.toUpperCase()}</Trans>
          </div>
          <AnimatePresence>
            {!open && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                style={{
                  fontSize: 9,
                  color: C.muted,
                  fontFamily: `'JetBrains Mono',monospace`,
                  marginTop: 2,
                }}>
                {totalItems} <Trans>skills</Trans>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.span
          animate={{ rotate: open ? 0 : -90 }}
          transition={springSnap}
          style={{
            color: open ? color : C.muted,
            fontSize: 13,
            fontFamily: `'JetBrains Mono',monospace`,
            display: 'inline-block',
          }}>
          ▾
        </motion.span>
      </motion.button>

      {/* ── Body ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="cb"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { ...ease, duration: 0.38 },
              opacity: { duration: 0.2 },
            }}
            style={{ overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px 0' }}>
              {Object.entries(groups).map(([gName, items]) => (
                <SubGroup
                  key={gName}
                  groupName={gName}
                  items={items}
                  color={color}
                  selected={selectedKey}
                  onSelect={setSelectedKey}
                />
              ))}
            </div>

            {/* ── Detail panel inline sous les skills ── */}
            <div style={{ padding: '0 18px 16px' }}>
              <DetailPanel
                infoKey={selectedKey}
                SKILL_INFO={SKILL_INFO}
                onClose={() => setSelectedKey(null)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

CategoryBlock.propTypes = {
  name: PropTypes.string.isRequired,
  catData: PropTypes.object.isRequired,
  SKILL_INFO: PropTypes.object.isRequired,
};

CategoryBlock.displayName = 'CategoryBlock';

export default CategoryBlock;
