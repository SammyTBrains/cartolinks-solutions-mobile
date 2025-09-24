import { ThemedText } from "@/components/themed-text";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View, ViewStyle } from "react-native";

interface GenerateButtonProps {
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

export function GenerateButton({
  onPress,
  disabled,
  style,
  accessibilityLabel,
}: GenerateButtonProps) {
  return (
    <View className="p-4 mt-1" style={style}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        onPress={onPress}
        className={`h-14 w-[99%] self-center rounded-xl justify-center items-center flex-row px-7 gap-3 ${
          disabled ? "bg-[#c2c2c2]" : "bg-[#eaeaea]"
        }`}
        style={{ opacity: disabled ? 0.7 : 1 }}
      >
        <View
          style={{
            position: "relative",
            width: 32,
            height: 32,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinearGradient
            colors={["#2CE9FF55", "#7C4DFF22"]}
            start={{ x: 0.3, y: 0.2 }}
            end={{ x: 0.9, y: 1 }}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              borderRadius: 15,
              transform: [{ translateX: 2 }, { translateY: 3 }],
              filter: "blur(3px)" as any,
              opacity: 1,
            }}
          />
          <View
            style={{
              width: 21,
              height: 21,
              borderRadius: 10,
              backgroundColor: disabled ? "#c2c2c2" : "#eaeaea",
            }}
          />
          <LinearGradient
            colors={["#27D1E7", "#7C4DFF"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              filter: "blur(0.8px)" as any,
              position: "absolute",
            }}
          />
        </View>
        <ThemedText
          style={{ fontSize: 18 }}
          className="text-[#1C1E22] font-semibold"
        >
          Generate
        </ThemedText>
      </Pressable>
    </View>
  );
}
