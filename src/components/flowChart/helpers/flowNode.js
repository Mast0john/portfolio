import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { Trans } from 'gatsby-plugin-react-i18next';

const C = {
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

const FlowNode = ({
  x,
  y,
  w = 155,
  h = 54,
  color,
  label,
  sublabel,
  slug, // Pour Simple Icons (ex: "adobephotoshop")
  logo, // Objet Gatsby avec childImageSharp (passé via `skillSlug` + mapping)
  hex = 'ffffff',
  emoji,
  nodeId,
  selected,
  onSelect,
  // eslint-disable-next-line no-unused-vars
  skillSlug, // Slug de la compétence (ex: "hard-skills/design/photoshop")
}) => {
  const [hov, setHov] = useState(false);
  const isActive = hov || selected === nodeId;

  // 1. Logo via Simple Icons (si `slug` est fourni)
  const logoUrl = slug ? `https://cdn.simpleicons.org/${slug}/${hex}` : null;

  // 2. Logo via Gatsby Image (si `logo` est un objet avec childImageSharp)
  const logoImg = logo?.childImageSharp?.fixed ? (
    <Img fixed={logo.childImageSharp.fixed} alt={label || 'Logo'} />
  ) : null;

  // 3. Fallback : emoji si aucun logo n'est disponible
  const hasIcon = logoUrl || logoImg || emoji;
  const tx = x - w / 2 + (hasIcon ? 42 : 14);

  return (
    <g
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => nodeId && onSelect(selected === nodeId ? null : nodeId)}
      style={{ cursor: nodeId ? 'pointer' : 'default' }}>
      {/* Fond du nœud (actif/inactif) */}
      {isActive && (
        <rect
          x={x - w / 2 - 8}
          y={y - h / 2 - 8}
          width={w + 16}
          height={h + 16}
          rx={14}
          fill={color}
          opacity={0.12}
        />
      )}
      {/* Bordure du nœud */}
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={8}
        fill={C.card}
        stroke={isActive ? color : C.border}
        strokeWidth={isActive ? 1.5 : 1}
      />
      {/* Barre de couleur à gauche */}
      <rect
        x={x - w / 2}
        y={y - h / 2 + 9}
        width={3}
        height={h - 18}
        rx={2}
        fill={color}
        opacity={isActive ? 1 : 0.6}
      />

      {/* Affichage du logo/icône/emoji */}
      {logoUrl && <image href={logoUrl} x={x - w / 2 + 10} y={y - 13} width={26} height={26} />}
      {logoImg && (
        <foreignObject x={x - w / 2 + 10} y={y - 13} width={26} height={26}>
          {logoImg}
        </foreignObject>
      )}
      {!logoUrl && !logoImg && emoji && (
        <text x={x - w / 2 + 22} y={y + (sublabel ? -3 : 6)} textAnchor="middle" fontSize={15}>
          {emoji}
        </text>
      )}

      {/* Label principal */}
      <text
        x={tx}
        y={y + (sublabel ? -5 : 5)}
        fontSize={11}
        fill={C.text}
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight={600}>
        <Trans>{label}</Trans>
      </text>

      {/* Sous-label (optionnel) */}
      {sublabel && (
        <text
          x={tx}
          y={y + 10}
          fontSize={8.5}
          fill={C.textDim}
          fontFamily="'JetBrains Mono', monospace">
          <Trans>{sublabel}</Trans>
        </text>
      )}
    </g>
  );
};

FlowNode.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number,
  h: PropTypes.number,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  sublabel: PropTypes.string,
  slug: PropTypes.string, // Pour Simple Icons
  logo: PropTypes.shape({
    // Logo Gatsby (passé via `skillSlug`)
    childImageSharp: PropTypes.shape({
      fixed: PropTypes.object,
    }),
  }),
  hex: PropTypes.string,
  emoji: PropTypes.string,
  nodeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func.isRequired,
  skillSlug: PropTypes.string, // Slug de la compétence (ex: "hard-skills/design/photoshop")
};

FlowNode.displayName = 'FlowNode';

export default FlowNode;
