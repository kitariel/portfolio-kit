import {cn} from '@/lib/utils';

/**
 * Pill whose label uses the site's violet→cyan accent gradient — keeps the AI
 * tool names (Claude / Codex / Gemini) visually merged with the buttons and the
 * "AI-Augmented" headline. Shape/size is overridable via className (twMerge).
 */
export function AccentPill({children, className}: {children: React.ReactNode; className?: string}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/[0.08] px-3 py-1 font-jetbrains text-sm font-medium',
        className
      )}
    >
      <span className="text-gradient">{children}</span>
    </span>
  );
}
