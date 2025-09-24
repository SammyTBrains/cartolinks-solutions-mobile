import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack />
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
