import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const CATEGORIES = [
  {
    id: "display",
    title: "display",
    subtitle: "Prod",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "promotion",
    title: "Promotion",
    subtitle: "",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "branding",
    title: "Branding",
    subtitle: "Editor's Choice",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "announcement",
    title: "Announceme...",
    subtitle: "",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "party",
    title: "Party",
    subtitle: "",
    image: require("@/assets/images/react-logo.png"),
  },
];

export default function PosterGeneratorScreen() {
  const [tab, setTab] = useState<"smart" | "advanced">("smart");
  const [selected, setSelected] = useState("display");
  const [prompt, setPrompt] = useState(
    "stunning promotional image of a\n" +
      "deliciously decorated cake,\n" +
      "emphasizing its layers, frosting, and\n" +
      "toppings in an enticing setting."
  );

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
          {/* Close button */}
          <Pressable
            accessibilityRole="button"
            style={{ width: 32, height: 32, justifyContent: "center" }}
          >
            <IconSymbol name="xmark" color="#fff" size={22} />
          </Pressable>

          {/* Segmented control */}
          <View style={styles.segmented}>
            <Pressable
              style={[styles.segment, tab === "smart" && styles.segmentActive]}
              onPress={() => setTab("smart")}
            >
              <ThemedText
                style={[
                  styles.segmentText,
                  tab === "smart" && styles.segmentTextActive,
                ]}
              >
                Smart script
              </ThemedText>
            </Pressable>
            <Pressable
              style={[
                styles.segment,
                tab === "advanced" && styles.segmentActive,
              ]}
              onPress={() => setTab("advanced")}
            >
              <ThemedText
                style={[
                  styles.segmentText,
                  tab === "advanced" && styles.segmentTextActive,
                ]}
              >
                Advanced script
              </ThemedText>
            </Pressable>
          </View>
        </View>

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
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            renderItem={({ item }) => {
              const active = item.id === selected;
              return (
                <Pressable
                  onPress={() => setSelected(item.id)}
                  style={[styles.card, active && styles.cardActive]}
                >
                  <ThemedText style={styles.cardSubtitle}>
                    {item.subtitle || " "}
                  </ThemedText>
                  <View style={{ flex: 1 }} />
                  <ThemedText style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </ThemedText>
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
                style={{
                  color: Colors.dark.text,
                  padding: 12,
                  fontSize: 18,
                  lineHeight: 26,
                  flex: 1,
                }}
              />
              <Pressable style={styles.mediaButton} onPress={() => {}}>
                <IconSymbol name="photo" color="#9BA1A6" size={22} />
              </Pressable>
            </View>
          </View>

          {/* Settings */}
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            <SettingRow label="Size" value="1080 x 1920 px" />
            <SettingRow label="Category" value="Foods and beverage" />
          </View>
        </ScrollView>

        {/* Generate button */}
        <View style={styles.footer}>
          <Pressable style={styles.generateBtn} onPress={() => {}}>
            <ThemedText style={styles.generateText}>Generate</ThemedText>
          </Pressable>
        </View>
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
  segmented: {
    flexDirection: "row",
    backgroundColor: "#101114",
    borderRadius: 14,
    padding: 4,
    alignSelf: "center",
    gap: 6,
  },
  segment: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  segmentActive: {
    backgroundColor: "#2D2F36",
  },
  segmentText: {
    color: "#9BA1A6",
    fontWeight: "600",
  },
  segmentTextActive: {
    color: "#fff",
  },
  card: {
    width: 140,
    height: 160,
    backgroundColor: "#2D2F36",
    borderRadius: 18,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 4,
  },
  cardActive: {
    borderWidth: 2,
    borderColor: "#6C6EF5",
  },
  cardSubtitle: {
    backgroundColor: "#3A3D45",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    color: "#C6C9D2",
    fontSize: 12,
    overflow: "hidden",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  textArea: {
    minHeight: 180,
    backgroundColor: "#1C1E22",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2B2E35",
    overflow: "hidden",
    flexDirection: "row",
  },
  mediaButton: {
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
    borderLeftColor: "#2B2E35",
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
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "rgba(10,10,12,0.6)",
  },
  generateBtn: {
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F1F2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  generateText: {
    color: "#1C1E22",
    fontWeight: "700",
    fontSize: 18,
  },
});
