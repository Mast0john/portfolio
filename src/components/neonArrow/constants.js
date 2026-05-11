// ─── Rectangle geometry ───────────────────────────────────────────────────────

// Fonction pour générer les flèches en fonction des dimensions
export const getArrows = (width, height) => {
  const R = { x: 0, y: 0, w: width, h: height };
  const centerX = R.w / 2;
  //const centerY = R.h / 2;

  // ─── Calcul de la pointe de flèche ────────────────────────────────────────────
  function mkHead(cx2, cy2, ex, ey, L = 16) {
    const dx = ex - cx2;
    const dy = ey - cy2;
    const len = Math.sqrt(dx * dx + dy * dy);
    const tx = dx / len;
    const ty = dy / len;
    const bx = -tx;
    const by = -ty;
    const c = Math.SQRT1_2;

    const a1x = c * (bx - by);
    const a1y = c * (bx + by);
    const a2x = c * (bx + by);
    const a2y = c * (-bx + by);

    const r = Math.round;
    return [
      `M ${r(ex + L * a1x)},${r(ey + L * a1y)}`,
      `L ${ex},${ey}`,
      `L ${r(ex + L * a2x)},${r(ey + L * a2y)}`,
    ].join(' ');
  }

  // ─── Arrows (recalculées dynamiquement en fonction de la largeur et la hauteur du rect) ──────────────────────────────
  // Flèches de gauche (dynamiques)
  const LEFT_ARROWS = [
    // 1 — Haut → Bord supérieur
    {
      shaft: `M ${centerX},-${height * 0.5} C ${centerX + width * 0.06},-${height * 0.3} ${centerX +
        width * 0.15},-${height * 0.1} ${centerX},0`,
      head: mkHead(centerX + width * 0.15, -height * 0.1, centerX, 0),
      sD: 0.5,
      sDelay: 0.1,
      hD: 0.13,
    },
    // 2 — Gauche haut → Bord gauche
    {
      shaft: `M -${width * 0.5},${height * 0.3} C -${width * 0.3},${height * 0.2} -${width *
        0.15},${height * 0.35} 0,${height * 0.3}`,
      head: mkHead(-width * 0.15, height * 0.35, 0, height * 0.3),
      sD: 0.48,
      sDelay: 0.0,
      hD: 0.13,
    },
    // 3 — Gauche bas → Bord gauche
    {
      shaft: `M -${width * 0.5},${height * 0.7} C -${width * 0.3},${height * 0.8} -${width *
        0.15},${height * 0.65} 0,${height * 0.7}`,
      head: mkHead(-width * 0.15, height * 0.65, 0, height * 0.7),
      sD: 0.5,
      sDelay: 0.09,
      hD: 0.13,
    },
    // 4 — Bas → Bord inférieur
    {
      shaft: `M ${centerX},${height * 1.5} C ${centerX + width * 0.06},${height * 1.3} ${centerX +
        width * 0.15},${height * 1.1} ${centerX},${height}`,
      head: mkHead(centerX + width * 0.15, height * 1.1, centerX, height),
      sD: 0.5,
      sDelay: 0.15,
      hD: 0.13,
    },
  ];

  // Flèches de droite (miroir horizontal de LEFT_ARROWS)
  const RIGHT_ARROWS = [
    // 1 — Haut → Bord supérieur
    {
      shaft: `M ${centerX},-${height * 0.5} C ${centerX - width * 0.06},-${height * 0.3} ${centerX -
        width * 0.15},-${height * 0.1} ${centerX},0`,
      head: mkHead(centerX - width * 0.15, -height * 0.1, centerX, 0),
      sD: 0.5,
      sDelay: 0.1,
      hD: 0.13,
    },
    // 2 — Droite haut → Bord droit
    {
      shaft: `M ${width * 1.5},${height * 0.3} C ${width * 1.3},${height * 0.2} ${width *
        1.15},${height * 0.35} ${width},${height * 0.3}`,
      head: mkHead(width * 1.15, height * 0.35, width, height * 0.3),
      sD: 0.48,
      sDelay: 0.0,
      hD: 0.13,
    },
    // 3 — Droite bas → Bord droit
    {
      shaft: `M ${width * 1.5},${height * 0.7} C ${width * 1.3},${height * 0.8} ${width *
        1.15},${height * 0.65} ${width},${height * 0.7}`,
      head: mkHead(width * 1.15, height * 0.65, width, height * 0.7),
      sD: 0.5,
      sDelay: 0.09,
      hD: 0.13,
    },
    // 4 — Bas → Bord inférieur
    {
      shaft: `M ${centerX},${height * 1.5} C ${centerX - width * 0.06},${height * 1.3} ${centerX -
        width * 0.15},${height * 1.1} ${centerX},${height}`,
      head: mkHead(centerX - width * 0.15, height * 1.1, centerX, height),
      sD: 0.5,
      sDelay: 0.15,
      hD: 0.13,
    },
  ];

  return { LEFT_ARROWS, RIGHT_ARROWS };
};
