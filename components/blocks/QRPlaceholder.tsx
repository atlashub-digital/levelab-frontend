import { QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * QR placeholder for the LIA launch WhatsApp group.
 *
 * Spec (levelab-zai-ui-spec-v1.0.json → lia.launch):
 *   - whatsapp_group_url = null
 *   - qr_code_value = null
 *   - when_missing_link = "Render a polished disabled/placeholder state reading
 *     'Link do grupo em breve'; never generate a fake QR code."
 *   - render_fake_qr = false
 *
 * This component NEVER generates a fake QR pattern. It renders a polished
 * DISABLED placeholder: a rounded box with a greyed QrCode lucide icon +
 * the canonical 'Link do grupo em breve' text. When the launch URL is
 * supplied via NEXT_PUBLIC_LIA_LAUNCH_GROUP_URL, the LIA page renders a
 * real QR code instead (and an active WhatsApp CTA).
 */
export function QRPlaceholder({
  size = 160,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label="Link do grupo em breve — placeholder do QR code"
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-forest/20 bg-cream/40 p-4 text-center',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <QrCode className="text-forest/30" style={{ width: size * 0.34, height: size * 0.34 }} />
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
        Link do grupo
      </p>
      <p className="text-[10px] font-medium text-forest/60">em breve</p>
    </div>
  );
}
