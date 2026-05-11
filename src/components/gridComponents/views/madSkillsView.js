import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import CategoryBlock from '../categoryBlock';
import { useTranslation } from 'gatsby-plugin-react-i18next';

/* ─── Palette ──────────────────────────────────────────────── */
const C = { yellow: '#f5c842' };

/* ─── Motion ───────────────────────────────────────────────── */
const ease = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };
const fadeSlideUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: ease },
  exit: { opacity: 0, y: -14, transition: { duration: 0.18 } },
};

const MadSkillsView = ({ SKILLS, SKILL_INFO, onCategoryClick }) => {
  const { t } = useTranslation();
  return (
    <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" exit="exit">
      <CategoryBlock
        name={t('Mad Skills')}
        catData={{
          color: C.yellow,
          icon: '⚡',
          groups: SKILLS.madSkills['Mad Skills'].groups,
        }}
        SKILL_INFO={SKILL_INFO}
        onClick={() => onCategoryClick && onCategoryClick('mad')}
      />
    </motion.div>
  );
};

MadSkillsView.propTypes = {
  SKILLS: PropTypes.object.isRequired,
  SKILL_INFO: PropTypes.object.isRequired,
  onCategoryClick: PropTypes.func,
};

MadSkillsView.defaultProps = {
  onCategoryClick: null,
};

MadSkillsView.displayName = 'MadSkillsView';

export default MadSkillsView;
