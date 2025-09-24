import { Colors } from "@/constants/theme";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & { className?: string };

export function ThemedView({
  style,
  className,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = Colors.dark.background;
  return (
    <View
      className={className}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
