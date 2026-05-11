import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import HardSkillsFlowchart from '../../flowChart/hardSkillsFlowchart';
import CategoryBlock from '../categoryBlock';
import { Trans } from 'gatsby-plugin-react-i18next';

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  border: '#252540',
  purple: '#7c6fe0',
  textDim: '#8888aa',
};

/* ─── Motion presets ───────────────────────────────────────── */
const springSnap = { type: 'spring', stiffness: 500, damping: 35 };
const ease = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

const fadeSlideUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: ease },
  exit: { opacity: 0, y: -14, transition: { duration: 0.18 } },
};

const HardSkillsView = ({ SKILLS, SKILL_INFO }) => {
  const [view, setView] = useState('grid');

  return (
    <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" exit="exit">
      {/* Toggle Grid / Flowchart */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
        {[
          ['grid', '⊞  Grid View'],
          ['flow', '⬡  Flowchart'],
        ].map(([id, label]) => (
          <motion.button
            key={id}
            onClick={() => setView(id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={springSnap}
            style={{
              padding: '8px 22px',
              borderRadius: 24,
              cursor: 'pointer',
              background: view === id ? `${C.purple}30` : 'transparent',
              border: `1px solid ${view === id ? C.purple : C.border}`,
              color: view === id ? C.purple : C.textDim,
              fontFamily: `'JetBrains Mono',monospace`,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.8,
              boxShadow: view === id ? `0 0 16px ${C.purple}40` : 'none',
            }}>
            <Trans>{label}</Trans>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div
            key="grid"
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            exit="exit">
            {Object.entries(SKILLS.hardSkills).map(([name, data]) => (
              <CategoryBlock key={name} name={name} catData={data} SKILL_INFO={SKILL_INFO} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="flow"
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            exit="exit">
            <HardSkillsFlowchart SKILL_INFO={SKILL_INFO} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

HardSkillsView.propTypes = {
  SKILLS: PropTypes.object.isRequired,
  SKILL_INFO: PropTypes.object.isRequired,
};

HardSkillsView.displayName = 'HardSkillsView';

export default HardSkillsView;
