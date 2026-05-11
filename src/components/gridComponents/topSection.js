import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { Trans } from 'gatsby-plugin-react-i18next';

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  // card: '#1a1a2e',
  card: '#233554',
  border: '#252540',
  muted: '#5a5a7a',
  textDim: '#ffffff',
};

/* ─── Motion presets ───────────────────────────────────────── */
const springSnap = { type: 'spring', stiffness: 500, damping: 35 };
const ease = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

/**
 * TopSection — section dépliable de premier niveau (Hard / Soft / Mad Skills).
 * Le clic sur le header toggle uniquement l'état ouvert/fermé.
 * Aucune navigation externe n'est déclenchée depuis ce composant.
 */
const TopSection = ({ label, color, icon, sublabel, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ marginBottom: 28 }}>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ boxShadow: `0 0 28px ${color}25` }}
        animate={{
          borderColor: open ? `${color}55` : C.border,
          borderRadius: open ? '12px 12px 0 0' : '12px',
          boxShadow: open ? `0 0 22px ${color}18` : 'none',
        }}
        transition={ease}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 20px',
          marginBottom: open ? 16 : 0,
          background: C.card,
          border: '1px solid',
          cursor: 'pointer',
        }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={springSnap}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            flexShrink: 0,
            background: `linear-gradient(135deg,${color}40,${color}15)`,
            border: `1px solid ${color}60`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}>
          {icon}
        </motion.div>

        <div style={{ flex: 1, textAlign: 'left' }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color,
              fontFamily: `'JetBrains Mono',monospace`,
              letterSpacing: 1.2,
            }}>
            <Trans>{label.toUpperCase()}</Trans>
          </div>
          <div
            style={{
              fontSize: 10,
              color: C.textDim,
              fontFamily: `'JetBrains Mono',monospace`,
              marginTop: 2,
            }}>
            <Trans>{sublabel}</Trans>
          </div>
        </div>

        <motion.span
          animate={{ rotate: open ? 0 : -90, color: open ? color : C.muted }}
          transition={springSnap}
          style={{
            fontSize: 14,
            fontFamily: `'JetBrains Mono',monospace`,
            display: 'inline-block',
          }}>
          ▾
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="ts"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { ...ease, duration: 0.45 },
              opacity: { duration: 0.22 },
            }}
            style={{
              overflow: 'hidden',
              borderLeft: `2px solid ${color}30`,
              paddingLeft: 18,
              paddingBottom: 8,
            }}>
            <Trans>{children}</Trans>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

TopSection.displayName = 'TopSection';

TopSection.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.node,
  sublabel: PropTypes.string,
  children: PropTypes.node,
};

TopSection.defaultProps = {
  icon: null,
  sublabel: '',
  children: null,
};

export default TopSection;
