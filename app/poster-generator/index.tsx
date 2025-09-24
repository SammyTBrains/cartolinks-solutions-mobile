import { CategoryCard } from "@/components/category-card";
import { GenerateButton } from "@/components/generate-button";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Foundation } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ALinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Category = { id: string; title: string; image: any };

const CATEGORIES: Category[] = [
  {
    id: "display",
    title: "display",
    image: require("../../assets/images/thumbnails/display.jpeg"),
  },
  {
    id: "promotion",
    title: "Promotion",
    image: require("../../assets/images/thumbnails/promotion.jpeg"),
  },
  {
    id: "branding",
    title: "Branding",
    image: require("../../assets/images/thumbnails/branding.jpeg"),
  },
  {
    id: "announcement",
    title: "Announceme...",
    image: require("../../assets/images/thumbnails/announcement.jpeg"),
  },
  {
    id: "party",
    title: "Party",
    image: require("../../assets/images/thumbnails/Party.jpeg"),
  },
];

const CARD_TINTS: Record<string, string> = {
  display: "#5F4937",
  promotion: "#9c2e6be9",
  branding: "#1e6b9bff",
  announcement: "#b6741dff",
  party: "#844e2cff",
};

const UNDERLINE_HEIGHT = 4;
const UNDERLINE_BOTTOM_OFFSET = -14;
const UNDERLINE_SIDE_EXPAND = 4;
const UNDERLINE_SMART_MAX_SHRINK = 14;

export default function PosterGeneratorScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"smart" | "advanced">("smart");
  const [selected, setSelected] = useState("display");
  const [prompt, setPrompt] = useState(
    "stunning promotional image of a\n" +
      "deliciously decorated cake,\n" +
      "emphasizing its layers, frosting, and\n" +
      "toppings in an enticing setting."
  );

  const [smartLayout, setSmartLayout] = useState<{ x: number; width: number }>({
    x: 0,
    width: 0,
  });
  const [advancedLayout, setAdvancedLayout] = useState<{
    x: number;
    width: number;
  }>({ x: 0, width: 0 });
  const insets = useSafeAreaInsets();

  const tintBg = (id: string) => CARD_TINTS[id] || "#1C1E22";

  // Animated underline
  const underlineLeft = useSharedValue(0);
  const underlineWidth = useSharedValue(0);
  useEffect(() => {
    if (!smartLayout.width) return;
    if (tab === "smart") {
      const gapToAdvanced = advancedLayout.x
        ? advancedLayout.x - UNDERLINE_SMART_MAX_SHRINK
        : smartLayout.width + UNDERLINE_SIDE_EXPAND * 2;
      underlineLeft.value = withTiming(0, { duration: 240 });
      underlineWidth.value = withTiming(
        Math.min(smartLayout.width + UNDERLINE_SIDE_EXPAND * 2, gapToAdvanced),
        { duration: 240 }
      );
    } else {
      const advMeasured = advancedLayout.width > 0;
      const advX = advMeasured
        ? advancedLayout.x
        : smartLayout.x + smartLayout.width + 8; // estimated position fallback
      const advWidth = advMeasured ? advancedLayout.width : smartLayout.width;
      underlineLeft.value = withTiming(advX - UNDERLINE_SIDE_EXPAND, {
        duration: 240,
      });
      underlineWidth.value = withTiming(advWidth + UNDERLINE_SIDE_EXPAND * 2, {
        duration: 240,
      });
    }
  }, [tab, smartLayout, advancedLayout, underlineLeft, underlineWidth]);
  const underlineStyle = useAnimatedStyle(() => ({
    left: underlineLeft.value,
    width: underlineWidth.value,
  }));

  return (
    <ThemedView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="px-4" style={{ paddingTop: insets.top + 10 }}>
        <Pressable
          accessibilityRole="button"
          className="w-11 h-11 justify-center items-start"
          onPress={() => router.back()}
        >
          <IconSymbol name="xmark" color="#fff" size={24} />
        </Pressable>
        <View className="mt-1 gap-2">
          <View className="relative">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => setTab("smart")}
                onLayout={(e: LayoutChangeEvent) =>
                  setSmartLayout(e.nativeEvent.layout)
                }
              >
                <ThemedText
                  className={`text-base px-9 mr-2 ${tab === "smart" ? "text-white font-semibold" : `text-[#9ba1a6e1]`}`}
                >
                  Smart script
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => setTab("advanced")}
                onLayout={(e: LayoutChangeEvent) =>
                  setAdvancedLayout(e.nativeEvent.layout)
                }
              >
                <ThemedText
                  className={`text-base px-9 ${tab === "advanced" ? "text-white font-semibold" : `text-[#9ba1a6e1]`}`}
                >
                  Advanced script
                </ThemedText>
              </Pressable>
            </View>
            {smartLayout.width > 0 && (
              <ALinearGradient
                colors={["#27D1E7", "#7C4DFF"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  {
                    position: "absolute",
                    bottom: UNDERLINE_BOTTOM_OFFSET,
                    height: UNDERLINE_HEIGHT,
                  },
                  underlineStyle,
                ]}
              />
            )}
          </View>
        </View>
      </View>
      <View className="h-px bg-[#1E2126] mt-[14px]" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 55 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 my-1 pt-4">
          <ThemedText
            style={{ fontSize: 19 }}
            className="text-white text-left font-semibold mb-4"
          >
            What type of posters do you want to create?
          </ThemedText>
        </View>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
          renderItem={({ item }) => (
            <CategoryCard
              item={item}
              active={item.id === selected}
              tintColor={tintBg(item.id)}
              onPress={() => setSelected(item.id)}
              accessibilityLabel={`Category ${item.title}`}
            />
          )}
        />
        <View className="px-5 mt-7">
          <View className="min-h-[180px] bg-[#121313] rounded-lg border border-[#121313] overflow-hidden pb-3">
            <TextInput
              multiline
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Describe your poster"
              placeholderTextColor={"#9BA1A6"}
              style={{
                color: Colors.dark.text,
                paddingHorizontal: 12,
                fontSize: 16,
              }}
            />
            <TouchableOpacity
              className="absolute right-3 bottom-3 w-10 h-10 rounded-xl bg-transparent justify-center items-center "
              onPress={() => {}}
            >
              <Foundation name="photo" size={24} color="#bdbfc1ff" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="px-5 mt-7">
          <ThemedText className="text-[11px] text-[#666768] mb-2 ml-1">
            Settings
          </ThemedText>
          <View className="bg-[#121313] rounded-lg overflow-hidden border border-[#121313]">
            <SettingRow label="Size" value="1080 x 1920 px" isLast={false} />
            <SettingRow
              label="Category"
              value="Foods and beverage"
              isLast={true}
            />
          </View>
        </View>
      </ScrollView>
      <GenerateButton
        style={{ paddingBottom: insets.bottom + 16 }}
        onPress={() => {}}
        accessibilityLabel="Generate poster"
      />
    </ThemedView>
  );
}

function SettingRow({
  label,
  value,
  isLast,
}: {
  label: string;
  value: string;
  isLast: boolean;
}) {
  return (
    <View>
      <View className="h-14 px-5 flex-row items-center">
        <ThemedText className="text-[#9BA1A6] font-normal text-[15px]">
          {label}
        </ThemedText>
        <View style={{ flex: 1 }} />
        <ThemedText className="text-[#666768] text-[15px]" numberOfLines={1}>
          {value}
        </ThemedText>
        <View style={{ width: 6 }} />
        <IconSymbol name="chevron.right" color="#9BA1A6" size={18} />
      </View>
      {!isLast && <View className="h-px bg-[#1e21266d] mx-5" />}
    </View>
  );
}
