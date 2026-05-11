import React from 'react';
import PropTypes from 'prop-types';
import CategoryBlock from '../categoryBlock';
import { motion } from 'framer-motion';

/* ─── Motion ───────────────────────────────────────── */
const ease = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

const fadeSlideUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: ease },
  exit: { opacity: 0, y: -14, transition: { duration: 0.18 } },
};
const SoftSkillsView = ({ SKILLS, SKILL_INFO }) => (
  <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" exit="exit">
    {Object.entries(SKILLS.softSkills).map(([name, data]) => (
      <CategoryBlock key={name} name={name} catData={data} SKILL_INFO={SKILL_INFO} />
    ))}
  </motion.div>
);

SoftSkillsView.propTypes = {
  SKILLS: PropTypes.object.isRequired,
  SKILL_INFO: PropTypes.object.isRequired,
};

SoftSkillsView.displayName = 'SoftSkillsView';

export default SoftSkillsView;
