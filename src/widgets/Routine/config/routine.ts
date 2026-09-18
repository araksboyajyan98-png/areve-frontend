import type { TranslationKey } from "@/shared/i18n";
import {
  CupIcon,
  HomeIcon,
  PaletteIcon,
  PlateIcon,
  SunriseIcon,
  TreeIcon,
} from "@/shared/ui/icons";

/** Порядок дня. Хранит ключи перевода, а не текст — см. Values/config. */
export interface RoutineStep {
  Icon: React.ComponentType<{ className?: string }>;
  title: TranslationKey;
  text: TranslationKey;
}

export const ROUTINE: readonly RoutineStep[] = [
  { Icon: SunriseIcon, title: "routine.arrivalTitle", text: "routine.arrivalText" },
  { Icon: CupIcon, title: "routine.breakfastTitle", text: "routine.breakfastText" },
  { Icon: PaletteIcon, title: "routine.lessonsTitle", text: "routine.lessonsText" },
  { Icon: TreeIcon, title: "routine.walkTitle", text: "routine.walkText" },
  { Icon: PlateIcon, title: "routine.lunchTitle", text: "routine.lunchText" },
  { Icon: HomeIcon, title: "routine.pickupTitle", text: "routine.pickupText" },
];
