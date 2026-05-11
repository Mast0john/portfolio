import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trans } from 'gatsby-plugin-react-i18next';

// Constantes de style (adapte selon ton projet)
const C = {
  card: '#1a1a2e',
  textDim: '#8888aa',
  border: '#252540',
  muted: '#5a5a7a',
};

/* ─── Variantes d'animation ────────────────────────────────── */
const springSnap = { type: 'spring', stiffness: 500, damping: 35 };

const panelV = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.14 } },
};

const DetailPanel = ({
  infoKey,
  SKILL_INFO,
  onClose,
  hint = 'Click on a skill to view its description',
}) => {
  const info = infoKey ? SKILL_INFO[infoKey] : null;

  return (
    <AnimatePresence mode="wait">
      {info ? (
        <motion.div
          key={infoKey}
          variants={panelV}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            padding: '18px 24px',
            background: C.card,
            border: `1px solid ${info.color || C.border}70`,
            borderRadius: 12,
          }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            {/* Barre colorée latérale */}
            <div
              style={{
                width: 4,
                alignSelf: 'stretch',
                borderRadius: 2,
                background: info.color || C.purple,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              {/* Titre + bouton fermer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: info.color || C.purple,
                    fontFamily: `'JetBrains Mono', monospace`,
                  }}>
                  {info.title}
                </span>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={springSnap}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: C.textDim,
                    fontSize: 16,
                    padding: 0,
                    lineHeight: 1,
                    marginLeft: 'auto',
                  }}>
                  ✕
                </motion.button>
              </div>

              {/* Description */}
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: C.textDim,
                  lineHeight: 1.65,
                  fontFamily: `'Space Grotesk', sans-serif`,
                }}>
                <Trans>{info.body}</Trans>
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="hint"
          variants={panelV}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            padding: '14px 24px',
            border: `1px solid ${C.border}`,
            borderRadius: 12,
          }}>
          <p
            style={{
              margin: 0,
              textAlign: 'center',
              color: C.muted,
              fontSize: 12,
              fontFamily: `'JetBrains Mono', monospace`,
            }}>
            <Trans>{hint}</Trans>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Ajouter displayName pour résoudre l'erreur
DetailPanel.displayName = 'DetailPanel';

// Validation des props
DetailPanel.propTypes = {
  infoKey: PropTypes.string,
  SKILL_INFO: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  hint: PropTypes.string,
};

// Valeurs par défaut pour les props optionnelles
DetailPanel.defaultProps = {
  infoKey: null,
  hint: 'Click on a skill to view its description',
};

export default DetailPanel;
