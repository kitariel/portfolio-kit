import {
  Blocks,
  Building2,
  CarFront,
  Dumbbell,
  Film,
  GraduationCap,
  Link2,
  MapPinned,
  MessagesSquare,
  PanelsTopLeft,
  Send,
  WalletCards,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/utils";

const visuals = {
  aliplace: MapPinned,
  finllet: WalletCards,
  bmad: Utensils,
  aikapoy: MessagesSquare,
  applywithcontext: Send,
  "webmak-labs": PanelsTopLeft,
  gymwebs: Dumbbell,
  linkhaus: Link2,
  movietrending: Film,
  "platform-template": Blocks,
  skyll: GraduationCap,
  gorentals: CarFront,
  yaxxi: CarFront,
} as const;

export function ProjectIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = visuals[slug as keyof typeof visuals] ?? Building2;
  return (
    <span
      className={cn(
        "icon-box bg-surface-elevated text-foreground-muted",
        className,
      )}
    >
      <Icon aria-hidden className="h-[18px] w-[18px]" />
    </span>
  );
}
