import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  {
    id: "display",
    title: "display",
    image: require("@/assets/images/thumbnails/display.jpeg"),
  },
  {
    id: "promotion",
    title: "Promotion",
    image: require("@/assets/images/thumbnails/promotion.jpeg"),
  },
  {
    id: "branding",
    title: "Branding",
    image: require("@/assets/images/thumbnails/branding.jpeg"),
  },
  {
    id: "announcement",
    title: "Announceme...",
    image: require("@/assets/images/thumbnails/announcement.jpeg"),
  },
  {
    id: "party",
    title: "Party",
    image: require("@/assets/images/thumbnails/Party.jpeg"),
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
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header: X on top, tabs below */}
        <View style={styles.header}>
          <Pressable
            accessibilityRole="button"
            style={styles.closeBtn}
            onPress={() => router.back()}
          >
            <IconSymbol name="xmark" color="#fff" size={24} />
          </Pressable>

          <View style={styles.tabsContainer}>
            <View style={styles.tabsBlock}>
              <View style={styles.tabsRow}>
                <Pressable
                  onPress={() => setTab("smart")}
                  onLayout={(e: LayoutChangeEvent) =>
                    setSmartLayout(e.nativeEvent.layout)
                  }
                >
                  <ThemedText
                    style={[
                      styles.tabText,
                      tab === "smart" && styles.tabTextActive,
                    ]}
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
                    style={[
                      styles.tabText,
                      tab === "advanced"
                        ? styles.tabTextActive
                        : styles.tabTextInactive,
                    ]}
                  >
                    Advanced script
                  </ThemedText>
                </Pressable>
              </View>
              {/* Wider gradient underline */}
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
        <View style={styles.tabsDivider} />

        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
            <ThemedText
              type="title"
              style={{ fontSize: 24, lineHeight: 32, marginBottom: 12 }}
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
                  style={[styles.card, isActive && styles.cardActive]}
                >
                  <Image
                    source={item.image}
                    style={styles.cardImage}
                    contentFit="cover"
                    transition={100}
                  />
                  <View style={styles.cardOverlay}>
                    {/* Guard BlurView so if native module fails we still render text */}
                    <BlurView
                      intensity={28}
                      tint="dark"
                      // experimentalBlurMethod removed to avoid potential native crash / blank screen
                      style={StyleSheet.absoluteFill}
                    />
                    <ThemedText
                      style={styles.cardOverlayText}
                      numberOfLines={1}
                    >
                      {item.title}
                    </ThemedText>
                  </View>
                </Pressable>
              );
            }}
          />

          {/* Prompt text area */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <View style={styles.textArea}>
              <TextInput
                multiline
                value={prompt}
                onChangeText={setPrompt}
                placeholder="Describe your poster"
                placeholderTextColor={"#9BA1A6"}
                style={styles.textInput}
              />
              <Pressable style={styles.fabMedia} onPress={() => {}}>
                <IconSymbol name="photo" color="#fff" size={18} />
              </Pressable>
            </View>
          </View>

          {/* Settings */}
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            <ThemedText style={styles.sectionHeading}>Settings</ThemedText>
            <SettingRow label="Size" value="1080 x 1920 px" />
            <SettingRow label="Category" value="Foods and beverage" />
          </View>
          <View style={styles.footer}>
            <Pressable style={styles.generateBtn} onPress={() => {}}>
              <LinearGradient
                colors={["#27D1E7", "#7C4DFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.generateOrb}
              />
              <ThemedText style={styles.generateText}>Generate</ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.settingRow}>
      <ThemedText style={styles.settingLabel}>{label}</ThemedText>
      <View style={{ flex: 1 }} />
      <ThemedText style={styles.settingValue}>{value}</ThemedText>
      <View style={{ width: 8 }} />
      <IconSymbol name="chevron.right" color="#9BA1A6" size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  closeBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  tabsContainer: {
    marginTop: 4,
    alignItems: "center",
    gap: 12,
  },
  tabsBlock: {
    position: "relative",
    alignItems: "center",
  },
  tabsRow: {
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#9BA1A6",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  tabTextInactive: {
    color: "#6F7782",
    fontWeight: "600",
  },
  // Removed unused segmented control styles & underline container
  tabsDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#1E2126",
  },
  card: {
    width: 140,
    height: 160,
    backgroundColor: "#2D2F36",
    borderRadius: 18,
    overflow: "hidden",
  },
  cardActive: {
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 8,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(28,30,34,0.75)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  cardOverlayText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    flex: 1,
  },
  textArea: {
    minHeight: 180,
    backgroundColor: "#1C1E22",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2B2E35",
    overflow: "hidden",
    paddingBottom: 12,
  },
  textInput: {
    color: Colors.dark.text,
    padding: 12,
    fontSize: 18,
    lineHeight: 26,
    flex: 1,
  },
  fabMedia: {
    position: "absolute",
    right: 12,
    bottom: 12,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#2D2F36",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#34373E",
  },
  settingRow: {
    height: 64,
    backgroundColor: "#1C1E22",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2B2E35",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  settingLabel: {
    color: "#9BA1A6",
    fontSize: 16,
  },
  settingValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: "600",
    color: "#9BA1A6",
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "rgba(10,10,12,0.6)",
    gap: 16,
  },
  generateBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F1F2FF",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 12,
  },
  generateText: {
    color: "#1C1E22",
    fontWeight: "700",
    fontSize: 18,
  },
  generateOrb: {
    width: 28,
    height: 28,
    borderRadius: 16,
  },
  progressTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: "#22252A",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#7C4DFF",
  },
  brandingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 4,
  },
  brandingPrimary: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  brandingSecondary: {
    fontSize: 13,
    color: "#9BA1A6",
  },
  brandingAccent: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  footerSa: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
