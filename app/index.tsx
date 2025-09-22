import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View style={{ height: 16 }} />
      <Link href="/poster-generator" asChild>
        <Pressable
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: "#eee",
            borderRadius: 8,
          }}
        >
          <Text>Open Poster Generator</Text>
        </Pressable>
      </Link>
    </View>
  );
}
