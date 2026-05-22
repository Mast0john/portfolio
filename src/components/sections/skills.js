import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

import AllView from '../gridComponents/views/allView';
import HardSkillsView from '../gridComponents/views/hardSkillsView';
import MadSkillsView from '../gridComponents/views/madSkillsView';
import SoftSkillsView from '../gridComponents/views/softSkillsView';

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  bg: '#0d0d1a',
  surface: '#12121f',
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
  textDim: '#8888aa',
};

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES  (fonts + scrollbar)
══════════════════════════════════════════════════════════════ */
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  ::-webkit-scrollbar            { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track      { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb      { background: ${C.border}; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover{ background: ${C.muted}; }
`;

/* ═══════════════════════════════════════════════════════════
   STYLED SECTION  — every CSS rule lives here.
   Dynamic accent colors are injected as --c (CSS custom
   property) on each element that needs one.
   Alpha variants are expressed with color-mix().
══════════════════════════════════════════════════════════════ */
const StyledSkillsSection = styled.section`
  /* ─────────────────────────────── ROOT */
  :root {
    min-height: 100vh;
    padding: 36px 28px;
    font-family: 'Space Grotesk', sans-serif;
    color: ${C.text};
    position: relative;
    z-index: 1;
    pointer-events: auto;
  }

  /* ─────────────────────────────── PARTICLES (arrière-plan) */
  #tsparticles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  /* ─────────────────────────────── HEADER */
  .header {
    text-align: center;
    margin-bottom: 42px;
    position: relative;
    z-index: 20;
  }
  .header__row {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
  }
  .header__icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, ${C.purple}, ${C.cyan});
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 20;
  }
  .header__title {
    font-size: 28px;
    font-weight: 700;
    color: ${C.text};
    letter-spacing: 3px;
  }
  .header__badge {
    font-size: 11px;
    color: ${C.purple};
    background: ${C.purpleGlow};
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 1px;
    font-family: 'JetBrains Mono', monospace;
    font-weight: 700;
    border: 1px solid ${C.purple}50;
  }
  .header__subtitle {
    color: ${C.textDim};
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
  }

  /* ─────────────────────────────── FILTERS */
  .filters {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin-bottom: 40px;
    flex-wrap: wrap;
    position: relative;
    z-index: 100 !important;
    pointer-events: auto !important;
  }
  .filter-btn {
    padding: 10px 28px;
    border-radius: 28px;
    border: 1.5px solid;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 100 !important;
    pointer-events: auto !important;
  }
  .filter-btn__icon {
    font-size: 15px;
    z-index: 20;
  }
  .filter-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--c);
    box-shadow: 0 0 8px var(--c);
    display: inline-block;
  }

  /* ─────────────────────────────── CONTENT */
  .content {
    max-width: 1320px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    pointer-events: auto !important;
  }

  /* ─────────────────────────────── TOP SECTION */
  .top-section {
    margin-bottom: 28px;
    position: relative;
  }
  .top-section__btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 20px;
    background: ${C.card};
    border: 1px solid; /* color animated by motion */
    cursor: pointer;
    z-index: 10;
  }
  .top-section__icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    flex-shrink: 0;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--c) 25%, transparent),
      color-mix(in srgb, var(--c) 8%, transparent)
    );
    border: 1px solid color-mix(in srgb, var(--c) 38%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 10;
  }
  .top-section__labels {
    flex: 1;
    text-align: left;
  }
  .top-section__label {
    font-size: 14px;
    font-weight: 700;
    color: var(--c);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 1.2px;
  }
  .top-section__sublabel {
    font-size: 10px;
    color: ${C.textDim};
    font-family: 'JetBrains Mono', monospace;
    margin-top: 2px;
  }
  .top-section__chevron {
    font-size: 14px;
    font-family: 'JetBrains Mono', monospace;
    display: inline-block;
  }
  .top-section__body {
    overflow: hidden;
    border-left: 2px solid color-mix(in srgb, var(--c) 19%, transparent);
    padding-left: 18px;
    padding-bottom: 8px;
  }

  /* ─────────────────────────────── CATEGORY BLOCK */
  .category-block {
    margin-bottom: 16px;
    border: 1px solid ${C.border};
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.25s ease;
    position: relative;
    z-index: 10;
  }
  .category-block--open {
    border-color: color-mix(in srgb, var(--c) 21%, transparent);
  }
  .category-block__btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 18px;
    background: ${C.card};
    border: none;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    transition: background 0.2s ease;
    z-index: 10;
  }
  .category-block--open .category-block__btn {
    background: color-mix(in srgb, var(--c) 4%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--c) 12%, transparent);
  }
  .category-block__icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: linear-gradient(
      135deg,
      color-mix(in srgb, var(--c) 25%, transparent),
      color-mix(in srgb, var(--c) 8%, transparent)
    );
    border: 1px solid color-mix(in srgb, var(--c) 31%, transparent);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
    z-index: 10;
  }
  .category-block__labels {
    flex: 1;
    text-align: left;
  }
  .category-block__label {
    font-size: 12px;
    font-weight: 700;
    color: var(--c);
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 1px;
  }
  .category-block__count {
    font-size: 9px;
    color: ${C.muted};
    font-family: 'JetBrains Mono', monospace;
    margin-top: 2px;
  }
  .category-block__chevron {
    font-size: 13px;
    font-family: 'JetBrains Mono', monospace;
    display: inline-block;
    color: ${C.muted};
  }
  .category-block--open .category-block__chevron {
    color: var(--c);
  }
  .category-block__body {
    overflow: hidden;
  }
  .category-block__groups {
    padding: 14px 18px 0;
  }
  .category-block__panel {
    padding: 0 18px 16px;
  }

  /* ─────────────────────────────── SUB-GROUP */
  .subgroup {
    margin-bottom: 14px;
  }
  .subgroup__btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px 0;
    z-index: 10;
  }
  .subgroup__chevron,
  .subgroup__name {
    font-size: 10px;
    color: ${C.muted};
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.8px;
    display: inline-block;
  }
  .subgroup__count {
    font-size: 9px;
    color: ${C.muted}80;
    font-family: 'JetBrains Mono', monospace;
  }
  .subgroup__body {
    overflow: hidden;
  }
  .cards-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-bottom: 4px;
  }

  /* ─────────────────────────────── SKILL CARD */
  .skill-card {
    border-top: 3px solid var(--c);
    border-radius: 10px;
    padding: 14px 10px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    min-width: 90px;
    max-width: 112px;
    position: relative;
    cursor: default;
    z-index: 10;
  }
  .skill-card--clickable {
    cursor: pointer;
  }
  .skill-card__dot {
    position: absolute;
    top: 5px;
    right: 6px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--c);
    box-shadow: 0 0 6px var(--c);
  }
  .skill-card__logo {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
  .skill-card__emoji {
    font-size: 26px;
  }
  .skill-card__name {
    font-size: 10px;
    color: ${C.text};
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.35;
  }
  .skill-card__sublabel {
    font-size: 8.5px;
    color: ${C.textDim};
    text-align: center;
    line-height: 1.3;
  }

  /* ─────────────────────────────── DETAIL PANEL */
  .detail-panel {
    border-radius: 12px;
    position: relative;
    z-index: 30;
    pointer-events: auto;
  }
  .detail-panel--info {
    padding: 18px 24px;
    background: ${C.card};
    border: 1px solid color-mix(in srgb, var(--c) 44%, transparent);
  }
  .detail-panel--hint {
    padding: 14px 24px;
    border: 1px solid ${C.border};
  }
  .detail-panel__inner {
    display: flex;
    align-items: flex-start;
    gap: 16px;
  }
  .detail-panel__bar {
    width: 4px;
    align-self: stretch;
    border-radius: 2px;
    background: var(--c);
    flex-shrink: 0;
  }
  .detail-panel__content {
    flex: 1;
  }
  .detail-panel__title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }
  .detail-panel__title {
    font-size: 13px;
    font-weight: 700;
    color: var(--c);
    font-family: 'JetBrains Mono', monospace;
  }
  .detail-panel__close {
    background: none;
    border: none;
    cursor: pointer;
    color: ${C.textDim};
    font-size: 16px;
    padding: 0;
    line-height: 1;
    margin-left: auto;
    z-index: 30;
    pointer-events: auto;
  }
  .detail-panel__body {
    margin: 0;
    font-size: 13px;
    color: ${C.textDim};
    line-height: 1.65;
    font-family: 'Space Grotesk', sans-serif;
  }
  .detail-panel__hint {
    margin: 0;
    text-align: center;
    color: ${C.muted};
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
  }

  /* ─────────────────────────────── VIEW TOGGLE */
  .view-toggle {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    justify-content: center;
    z-index: 20;
  }
  .view-toggle__btn {
    padding: 8px 22px;
    border-radius: 24px;
    border: 1px solid;
    cursor: pointer;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    z-index: 20;
    pointer-events: auto;
  }

  /* ─────────────────────────────── FLOWCHART */
  .flowchart-wrapper {
    width: 100%;
    overflow-x: auto;
    overflow-y: auto;
    max-height: 74vh;
    border-radius: 16px;
    position: relative;
    z-index: 10;
    pointer-events: auto;
  }
  .flowchart-panel {
    margin-top: 16px;
    position: relative;
    z-index: 10;
  }
`;

/* ─── Motion presets ───────────────────────────────────────── */
const spring = { type: 'spring', stiffness: 380, damping: 28 };
const springSnap = { type: 'spring', stiffness: 500, damping: 35 };
const ease = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

const stagger = (d = 0.06) => ({
  hidden: {},
  visible: { transition: { staggerChildren: d } },
});

/* ─── GraphQL query ────────────────────────────────────────── */
const SKILLS_QUERY = graphql`
  query SkillsPortfolioQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/skills/" } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        frontmatter {
          type
          name
          section
          category
          group
          infoKey
          title
          slug
          hex
          emoji
          color
          sublabel
          order
          icon
          logo {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        rawMarkdownBody
      }
    }
  }
`;

/* ─── Filter Buttons ─────────────────────────────────────── */
const FILTERS = [
  { id: 'all', label: 'All', color: C.text, icon: '◈', glow: C.text },
  { id: 'hard', label: 'Hard Skills', color: C.purple, icon: '💻', glow: C.purple },
  { id: 'soft', label: 'Soft Skills', color: C.green, icon: '🗣️', glow: C.green },
  { id: 'mad', label: 'Mad Skills', color: C.yellow, icon: '⚡', glow: C.yellow },
];

/* ─── Data helpers ─────────────────────────────────────────── */
function useSkillsData() {
  const data = useStaticQuery(SKILLS_QUERY);
  const nodes = data.allMarkdownRemark.nodes;

  // Build SKILL_INFO  { infoKey → { title, color, body } }
  const SKILL_INFO = {};
  nodes
    .filter(n => n.frontmatter.type === 'skill')
    .forEach(({ frontmatter: fm, rawMarkdownBody }) => {
      if (fm.infoKey) {
        SKILL_INFO[fm.infoKey] = {
          title: fm.title,
          color: fm.color,
          body: rawMarkdownBody.trim(),
        };
      }
    });

  // Build category map  { "section/category" → { name, icon, color } }
  const catMap = {};
  nodes
    .filter(n => n.frontmatter.type === 'category')
    .forEach(({ frontmatter: fm }) => {
      catMap[`${fm.section}/${fm.slug}`] = { name: fm.name, icon: fm.icon, color: fm.color };
    });

  // Build SKILLS hierarchy
  // SKILLS.hardSkills / softSkills / madSkills
  // Each key → { color, icon, groups: { groupName → [items] } }
  const sectionMap = {
    'hard-skills': 'hardSkills',
    'soft-skills': 'softSkills',
    'mad-skills': 'madSkills',
  };

  const SKILLS = { hardSkills: {}, softSkills: {}, madSkills: {} };

  // Insert categories first (ordered)
  nodes
    .filter(n => n.frontmatter.type === 'category')
    .forEach(({ frontmatter: fm }) => {
      const sKey = sectionMap[fm.section];
      if (!sKey) {
        return;
      }
      SKILLS[sKey][fm.name] = { color: fm.color, icon: fm.icon, groups: {} };
    });

  // Insert skills into their category groups
  nodes
    .filter(n => n.frontmatter.type === 'skill')
    .forEach(({ frontmatter: fm }) => {
      const sKey = sectionMap[fm.section];
      if (!sKey) {
        return;
      }
      const catMeta = catMap[`${fm.section}/${fm.category}`];
      if (!catMeta) {
        return;
      }
      const catName = catMeta.name;
      if (!SKILLS[sKey][catName]) {
        return;
      }
      const groups = SKILLS[sKey][catName].groups;
      if (!groups[fm.group]) {
        groups[fm.group] = [];
      }
      groups[fm.group].push({
        name: fm.name,
        slug: fm.slug || undefined,
        hex: fm.hex || undefined,
        emoji: fm.emoji || undefined,
        sublabel: fm.sublabel || undefined,
        infoKey: fm.infoKey || undefined,
        logo: fm.logo || undefined,
      });
    });

  return { SKILLS, SKILL_INFO };
}

const Skills = () => {
  const { t } = useTranslation();
  const { SKILLS, SKILL_INFO } = useSkillsData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);
  const handleCategoryClick = categoryName => {
    // Normalize category identifiers coming from child components or filter buttons
    const map = {
      'Hard Skills': 'hard',
      'Soft Skills': 'soft',
      'Mad Skills': 'mad',
      hard: 'hard',
      soft: 'soft',
      mad: 'mad',
      all: 'all',
    };
    const id = map[categoryName] || categoryName;
    setActiveCategory(id);
  };

  // const handleClosePanel = () => {
  //   setSelectedSkill(null);
  // };

  return (
    <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'auto' }}>
      <GlobalStyle />
      <StyledSkillsSection>
        <h2 className="numbered-heading">{t('Skills')}</h2>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...ease, duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 42 }}>
          <motion.div
            style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            {/* Icône et titre */}
          </motion.div>
          <p style={{ color: C.textDim, fontSize: 12, fontFamily: `'JetBrains Mono',monospace` }}>
            <Trans>Select a category · Expand/collapse · Click on a skill</Trans>
          </p>
        </motion.div>

        {/* ── Filter buttons ── */}
        {mounted && (
          <motion.div
            className="filters"
            variants={stagger(0.1)}
            initial="hidden"
            animate="visible">
            {FILTERS.map(f => {
              const isActive = activeCategory === f.id;
              const isAll = f.id === 'all';
              const isAllActive = isActive && isAll;
              return (
                <motion.button
                  key={f.id}
                  className={`filter-btn ${isAllActive ? 'filter-btn--all-active' : ''}`}
                  style={{ '--c': f.color }}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.85 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: spring },
                  }}
                  whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${f.glow}40` }}
                  whileTap={{ scale: 0.96 }}
                  animate={
                    isActive
                      ? {
                        borderColor: f.color,
                        color: f.color,
                        background: `${f.color}22`,
                        scale: 1.06,
                        boxShadow: `0 0 24px ${f.glow}50`,
                      }
                      : {
                        borderColor: C.border,
                        color: C.textDim,
                        background: 'transparent',
                        scale: 1,
                      }
                  }
                  transition={springSnap}
                  onClick={() => handleCategoryClick(f.id)}>
                  <span className="filter-btn__icon">{f.icon}</span>
                  <Trans>{f.label}</Trans>
                  {isActive && <motion.span className="filter-dot" layoutId="filter-dot" />}
                </motion.button>
              );
            })}
          </motion.div>
        )}

        {/* Content */}
        {mounted && (
          <div style={{ maxWidth: 1320, margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              {activeCategory === 'all' && (
                <AllView key="all" SKILLS={SKILLS} SKILL_INFO={SKILL_INFO} />
              )}
              {activeCategory === 'hard' && (
                <HardSkillsView key="hard" SKILLS={SKILLS} SKILL_INFO={SKILL_INFO} />
              )}
              {activeCategory === 'soft' && (
                <SoftSkillsView key="soft" SKILLS={SKILLS} SKILL_INFO={SKILL_INFO} />
              )}
              {activeCategory === 'mad' && (
                <MadSkillsView key="mad" SKILLS={SKILLS} SKILL_INFO={SKILL_INFO} />
              )}
            </AnimatePresence>
          </div>
        )}
      </StyledSkillsSection>
    </div>
  );
};

Skills.displayName = 'Skills';

export default Skills;
