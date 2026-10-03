import { cn } from '@/lib/utils';

/**
 * OliveBranch — decorative olive-branch SVG (stem + small leaves) used to
 * frame section corners (bundle banner, footer, hero). Maquette motif:
 * elegant line-art branch, slightly faded so it sits behind the content
 * without competing for attention.
 *
 * Two orientations: 'left' (stem rising from bottom-left, leaves opening
 * up-right) and 'right' (mirrored). A 'thin' variant renders at lower
 * opacity for subtle background framing.
 */
export function OliveBranch({
  className,
  orientation = 'left',
  thin = false,
}: {
  className?: string;
  orientation?: 'left' | 'right';
  thin?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className={cn('overflow-visible', thin ? 'opacity-25' : 'opacity-50', className)}
      style={{
        transform: orientation === 'right' ? 'scaleX(-1)' : undefined,
      }}
      fill="none"
      stroke="currentColor"
    >
      {/* Main stem — gentle S-curve rising from bottom-left */}
      <path
        d="M10 190C30 150 60 130 90 110C120 90 145 60 165 20"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Side stem branch */}
      <path
        d="M85 113C95 95 110 88 130 90"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* Leaves along the main stem — almond/olive shape, alternating sides */}
      <g strokeWidth="1.1" strokeLinejoin="round">
        {/* Lower-left leaf pair */}
        <LeafAt cx={22} cy={170} rot={-35} />
        <LeafAt cx={38} cy={158} rot={28} />
        {/* Mid-lower */}
        <LeafAt cx={52} cy={140} rot={-30} />
        <LeafAt cx={68} cy={128} rot={32} />
        {/* Mid */}
        <LeafAt cx={88} cy={115} rot={-28} />
        <LeafAt cx={108} cy={100} rot={30} />
        {/* Mid-upper */}
        <LeafAt cx={128} cy={82} rot={-26} />
        <LeafAt cx={144} cy={68} rot={28} />
        {/* Upper */}
        <LeafAt cx={158} cy={48} rot={-24} />
        <LeafAt cx={170} cy={32} rot={26} />
      </g>
      {/* Small olives (3 tiny dots) */}
      <g fill="currentColor" stroke="none" opacity="0.6">
        <ellipse cx={78} cy={134} rx={3.4} ry={2} transform="rotate(-15 78 134)" />
        <ellipse cx={118} cy={106} rx={3.4} ry={2} transform="rotate(-10 118 106)" />
        <ellipse cx={150} cy={58} rx={3.2} ry={1.9} transform="rotate(-8 150 58)" />
      </g>
    </svg>
  );
}

/**
 * Single almond-shaped olive leaf, centered at (cx,cy) and rotated `rot`
 * degrees. Maquette leaves are slim and pointed.
 */
function LeafAt({ cx, cy, rot }: { cx: number; cy: number; rot: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <path d="M0 0C4 -8 12 -10 16 -7C12 -4 8 0 0 0Z" transform="translate(0 4)" />
      <path d="M0 0C-4 -8 -12 -10 -16 -7C-12 -4 -8 0 0 0Z" transform="translate(0 4)" />
      {/* Vein */}
      <path d="M0 4L0 -10" strokeWidth="0.6" opacity="0.7" />
    </g>
  );
}
