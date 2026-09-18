import type { TranslationKey } from "@/shared/i18n";
import { BlocksIcon, HeartIcon, HouseIcon, ShieldIcon } from "@/shared/ui/icons";

/*
 * Список создаётся при загрузке модуля, поэтому хранит КЛЮЧИ перевода,
 * а не текст: текст застыл бы на языке того момента.
 * Тип TranslationKey сторожит опечатки — несуществующий ключ не соберётся.
 */
export interface ValueItem {
  Icon: React.ComponentType<{ className?: string }>;
  title: TranslationKey;
  text: TranslationKey;
}

export const VALUES: readonly ValueItem[] = [
  { Icon: HeartIcon, title: "values.individualTitle", text: "values.individualText" },
  { Icon: ShieldIcon, title: "values.safetyTitle", text: "values.safetyText" },
  { Icon: BlocksIcon, title: "values.playTitle", text: "values.playText" },
  { Icon: HouseIcon, title: "values.communityTitle", text: "values.communityText" },
];
