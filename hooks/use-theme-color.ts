/** Light/Dark aware color helper */
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Always dark mode enforced; ensure hook still invoked in case future side-effects
  useColorScheme();
  const colorFromProps = props.dark;
  return colorFromProps ?? Colors.dark[colorName];
}
