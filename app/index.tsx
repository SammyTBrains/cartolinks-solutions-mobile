import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ height: 16 }} />
      <Link href="/poster-generator" asChild>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: "#eee",
            borderRadius: 8,
          }}
        >
          <Text className="font-semibold">Open Poster Generator</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
