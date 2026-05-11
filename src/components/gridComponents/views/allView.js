import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import TopSection from '../topSection';
import CategoryBlock from '../categoryBlock';
import { useTranslation } from 'gatsby-plugin-react-i18next';

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  purple: '#7c6fe0',
  green: '#00c896',
  yellow: '#f5c842',
};

/* ─── Motion ───────────────────────────────────────────────── */
const ease = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };
const fadeSlideUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: ease },
  exit: { opacity: 0, y: -14, transition: { duration: 0.18 } },
};

const AllView = ({ SKILLS, SKILL_INFO }) => {
  const { t } = useTranslation();

  return (
    <motion.div variants={fadeSlideUp} initial="hidden" animate="visible" exit="exit">
      {/* ── Hard Skills ── */}
      <TopSection
        label={t('Hard Skills')}
        color={C.purple}
        icon="💻"
        sublabel={t('Design · Dev · Tools · Operating System')}>
        {Object.entries(SKILLS.hardSkills).map(([name, data]) => (
          <CategoryBlock key={name} name={name} catData={data} SKILL_INFO={SKILL_INFO} />
        ))}
      </TopSection>

      {/* ── Soft Skills ── */}
      <TopSection
        label={t('Soft Skills')}
        color={C.green}
        icon="🗣️"
        sublabel={t('Languages · Methodology')}>
        {Object.entries(SKILLS.softSkills).map(([name, data]) => (
          <CategoryBlock key={name} name={name} catData={data} SKILL_INFO={SKILL_INFO} />
        ))}
      </TopSection>

      {/* ── Mad Skills ── */}
      <TopSection
        label={t('Mad Skills')}
        color={C.yellow}
        icon="⚡"
        sublabel={t('Passions & interests')}>
        <CategoryBlock
          name={t('Mad Skills')}
          catData={{
            color: C.yellow,
            icon: '⚡',
            groups: SKILLS.madSkills['Mad Skills'].groups,
          }}
          SKILL_INFO={SKILL_INFO}
        />
      </TopSection>
    </motion.div>
  );
};

AllView.propTypes = {
  SKILLS: PropTypes.object.isRequired,
  SKILL_INFO: PropTypes.object.isRequired,
};

AllView.displayName = 'AllView';

export default AllView;
