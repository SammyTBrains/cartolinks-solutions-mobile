import { ThemedText } from "@/components/themed-text";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

export interface CategoryCardItem {
  id: string;
  title: string;
  image: any;
}

interface CategoryCardProps {
  item: CategoryCardItem;
  active: boolean;
  tintColor: string;
  onPress: () => void;
  accessibilityLabel?: string;
}

export function CategoryCard({
  item,
  active,
  tintColor,
  onPress,
  accessibilityLabel,
}: CategoryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`bg-[#2D2F36] rounded-2xl overflow-hidden ${
        active
          ? "border-[3px] p-[2px] w-[95px] h-[135px] border-white"
          : "border w-[90px] h-[130px] border-[#2F3339]"
      }`}
    >
      <Image
        source={item.image}
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
        contentFit="cover"
        onError={(error) =>
          console.warn("Image failed to load", item.id, error)
        }
        transition={100}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
      <View
        className={`absolute ${
          active
            ? "left-[2px] right-[2px] bottom-[2px]"
            : "left-0 right-0 bottom-0"
        } h-10 flex-row items-center justify-center px-2`}
        style={{
          backgroundColor: tintColor,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <ThemedText
          style={{ fontSize: 13, textAlign: "center" }}
          className="text-white"
          numberOfLines={1}
        >
          {item.title}
        </ThemedText>
      </View>
    </Pressable>
  );
}
