import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";

type Category = {
  id: string;
  title: string;
  image: any;
  tags?: string[];
  badge?: string;
};

const CATEGORIES: Category[] = [
  {
    id: "display",
    title: "display",
    image: require("../../assets/images/thumbnails/display.jpeg"),
    // first card shows two inline text labels in the bottom bar
    tags: ["display", "Prod"],
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
    badge: "Editor's Choice",
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

  // track tab positions for underline
  const [smartLayout, setSmartLayout] = useState<{ x: number; width: number }>({
    x: 0,
    width: 0,
  });
  const [advancedLayout, setAdvancedLayout] = useState<{
    x: number;
    width: number;
  }>({ x: 0, width: 0 });

  const active = tab === "smart" ? smartLayout : advancedLayout;

  return (
    <ThemedView className="flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      {/* Header + tabs */}
      <View
        className="px-4"
        style={{ paddingTop: Platform.OS === "ios" ? 8 : 8 }}
      >
        <Pressable
          accessibilityRole="button"
          className="w-11 h-11 justify-center items-start"
          onPress={() => router.back()}
        >
          <IconSymbol name="xmark" color="#fff" size={24} />
        </Pressable>

        <View className="mt-1 items-center gap-3">
          <View className="relative items-center">
            <View className="flex-row gap-6 items-center">
              <Pressable
                onPress={() => setTab("smart")}
                onLayout={(e: LayoutChangeEvent) =>
                  setSmartLayout(e.nativeEvent.layout)
                }
              >
                <ThemedText
                  className={`text-lg font-bold ${
                    tab === "smart" ? "text-white" : "text-[#9BA1A6]"
                  }`}
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
                  className={`text-lg font-semibold ${
                    tab === "advanced" ? "text-white" : "text-[#6F7782]"
                  }`}
                >
                  Advanced script
                </ThemedText>
              </Pressable>
            </View>
            {/* Gradient underline extended */}
            <LinearGradient
              colors={["#27D1E7", "#7C4DFF"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                position: "absolute",
                left: Math.max(active.x - 10, 0),
                bottom: -8,
                width: Math.max(
                  Math.min(active.width * 1.8, 260),
                  active.width + 60
                ),
                height: 3,
                borderRadius: 3,
              }}
            />
          </View>
        </View>
      </View>
      <View className="h-px bg-[#1E2126]" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-5">
          <ThemedText
            type="title"
            className="text-white text-[23px] leading-8 font-bold mb-4"
          >
            What type of posters do you want to create?
          </ThemedText>
        </View>

        {/* Categories carousel */}
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(i) => i.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
          renderItem={({ item }) => {
            const isActive = item.id === selected;
            return (
              <Pressable
                onPress={() => setSelected(item.id)}
                className={`w-[140px] h-40 bg-[#2D2F36] rounded-2xl overflow-hidden ${
                  isActive ? "border-2 border-white" : "border border-[#2F3339]"
                }`}
              >
                <Image
                  source={item.image}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  onError={(error) => {
                    console.warn("Image failed to load", item.id, error);
                  }}
                  transition={100}
                />
                {/* subtle bottom gradient for readability */}
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.65)"]}
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
                  }}
                />
                {item.badge ? (
                  <View className="absolute top-2 left-2 bg-[#1C1E22CC] px-2 py-1 rounded-lg border border-[#2F3238]">
                    <ThemedText className="text-[10px] font-semibold text-white">
                      {item.badge}
                    </ThemedText>
                  </View>
                ) : null}
                <View className="absolute left-2 right-2 bottom-2 h-9 rounded-xl bg-[rgba(28,30,34,0.75)] flex-row items-center px-2.5">
                  {item.tags && item.tags.length > 0 ? (
                    // Inline two text labels (deduplicate in case of accidental repeats)
                    <>
                      <ThemedText
                        className="text-white text-sm font-bold flex-1"
                        numberOfLines={1}
                      >
                        {item.tags[0]}
                      </ThemedText>
                      {item.tags[1] && item.tags[1] !== item.tags[0] ? (
                        <ThemedText
                          className="text-white text-sm font-bold"
                          numberOfLines={1}
                        >
                          {item.tags[1]}
                        </ThemedText>
                      ) : null}
                    </>
                  ) : (
                    <ThemedText
                      className="text-white text-sm font-bold flex-1"
                      numberOfLines={1}
                    >
                      {item.title}
                    </ThemedText>
                  )}
                </View>
              </Pressable>
            );
          }}
        />

        {/* Prompt text area */}
        <View className="px-5 pt-5">
          <View className="min-h-[180px] bg-[#1C1E22] rounded-2xl border border-[#2B2E35] overflow-hidden pb-3">
            <TextInput
              multiline
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Describe your poster"
              placeholderTextColor={"#9BA1A6"}
              style={{
                color: Colors.dark.text,
                padding: 12,
                fontSize: 18,
                lineHeight: 26,
                flex: 1,
              }}
            />
            <Pressable
              className="absolute right-3 bottom-3 w-10 h-10 rounded-xl bg-[#2D2F36] justify-center items-center border border-[#34373E]"
              onPress={() => {}}
            >
              <IconSymbol name="photo" color="#fff" size={18} />
            </Pressable>
          </View>
        </View>

        {/* Settings */}
        <View className="px-5 pt-4">
          <ThemedText className="text-[15px] font-semibold text-[#9BA1A6] mb-1">
            Settings
          </ThemedText>
          <SettingRow label="Size" value="1080 x 1920 px" />
          <SettingRow label="Category" value="Foods and beverage" />
        </View>
        <View className="absolute left-0 right-0 bottom-0 p-4 pb-8 bg-[rgba(10,10,12,0.6)] gap-4">
          <Pressable
            className="h-14 rounded-full bg-[#F1F2FF] justify-center items-center flex-row px-6 gap-3"
            onPress={() => {}}
            accessibilityRole="button"
          >
            <LinearGradient
              colors={["#27D1E7", "#7C4DFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
            <ThemedText className="text-[#1C1E22] font-bold text-lg">
              Generate
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="h-16 bg-[#1C1E22] rounded-2xl border border-[#2B2E35] px-5 flex-row items-center mb-3">
      <ThemedText className="text-[#9BA1A6] text-base">{label}</ThemedText>
      <View style={{ flex: 1 }} />
      <ThemedText className="text-white text-base font-semibold">
        {value}
      </ThemedText>
      <View style={{ width: 8 }} />
      <IconSymbol name="chevron.right" color="#9BA1A6" size={20} />
    </View>
  );
}
