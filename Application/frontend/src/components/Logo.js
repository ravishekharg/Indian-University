/**
 * Inline SVG crest/seal mark - the platform's one bold, bespoke visual
 * element. Deliberately not an external image file so it stays crisp at
 * any size and ships with zero extra asset management.
 */
function Logo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Indian University Platform crest"
    >
      <circle cx="32" cy="32" r="30" fill="var(--color-ink)" />
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
      />
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeDasharray="1.2 4.4"
      />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="'Source Serif 4', Georgia, serif"
        fontSize="24"
        fontWeight="600"
        fill="var(--color-accent-soft)"
      >
        IU
      </text>
    </svg>
  );
}

export default Logo;
