import Image from 'next/image';
import { cn } from '@/lib/utils';
import { liaInfo } from '@/lib/content/brand';

/**
 * LIA avatar — uses the approved placeholder by default.
 * Integration: replace /public/placeholders/lia-placeholder.svg with the
 * official LIA visual asset from the LeveLab Drive DAM. No invented faces.
 */
export function LIAAvatar({
  size = 48,
  className,
  ring = true,
}: {
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      className={cn(
        'relative inline-grid place-items-center overflow-hidden rounded-full bg-gradient-forest',
        ring && 'ring-2 ring-gold/40 ring-offset-2 ring-offset-ivory',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={liaInfo.placeholder}
        alt="LIA — assistente de bem-estar da LeveLab"
        width={size}
        height={size}
        className="h-full w-full object-cover"
      />
    </span>
  );
}
