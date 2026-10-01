import { cn } from '@/lib/utils';

/**
 * QR code placeholder for the LIA launch WhatsApp group.
 * The final invite link will be injected into config/site.ts → liaWhatsappGroupUrl
 * before the 12/10/2026 launch. This is a clearly-labelled placeholder visual.
 */
export function QRPlaceholder({ size = 160, className }: { size?: number; className?: string }) {
  // deterministic pseudo-random module pattern (not a real code)
  const modules: boolean[] = [];
  let seed = 7;
  for (let i = 0; i < 21 * 21; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    modules.push((seed >> 8) % 2 === 0);
  }
  const cell = size / 21;
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) =>
      r >= br && r < br + 7 && c >= bc && c < bc + 7;
    return inBox(0, 0) || inBox(0, 14) || inBox(14, 0);
  };
  const finderCell = (r: number, c: number) => {
    const inBox = (br: number, bc: number) => {
      if (r < br || r >= br + 7 || c < bc || c >= bc + 7) return null;
      const dr = r - br;
      const dc = c - bc;
      if (dr === 0 || dr === 6 || dc === 0 || dc === 6) return true;
      if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) return true;
      return false;
    };
    return inBox(0, 0) ?? inBox(0, 14) ?? inBox(14, 0);
  };

  return (
    <div
      className={cn('rounded-2xl border border-forest/15 bg-white p-3 shadow-soft', className)}
      style={{ width: size + 24, height: size + 24 }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        role="img"
        aria-label="QR code placeholder — link final será inserido"
      >
        <rect width={size} height={size} fill="#fbf8f0" />
        {Array.from({ length: 21 }).map((_, r) =>
          Array.from({ length: 21 }).map((_, c) => {
            const filled = isFinder(r, c) ? finderCell(r, c) : modules[r * 21 + c];
            if (!filled) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * cell}
                y={r * cell}
                width={cell}
                height={cell}
                fill="#15302a"
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
