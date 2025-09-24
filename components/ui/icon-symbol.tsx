// Cross-platform icon component mapping SF Symbols (iOS) to MaterialIcons (Android/Web)
import { MaterialIcons } from "@expo/vector-icons";
import * as React from "react";
import { Platform } from "react-native";

// Extend this map as you add new symbols using SF Symbol semantic names
const ANDROID_WEB_MAPPING: Record<string, keyof typeof MaterialIcons.glyphMap> =
  {
    bolt: "bolt",
    "chevron.right": "chevron-right",
    "chevron.right.circle": "chevron-right",
    xmark: "close",
    "xmark.circle.fill": "close",
    info: "info-outline",
    "info.circle": "info-outline",
    "info.circle.fill": "info",
    questionmark: "help-outline",
    "questionmark.circle": "help-outline",
    "questionmark.circle.fill": "help",
    exclamationmark: "error-outline",
    "exclamationmark.circle": "error-outline",
    "exclamationmark.circle.fill": "error",
    plus: "add",
    "plus.circle": "add-circle-outline",
    "plus.circle.fill": "add-circle",
    checkmark: "check",
    "checkmark.circle": "check-circle-outline",
    "checkmark.circle.fill": "check-circle",
    trash: "delete-outline",
    heart: "favorite-outline",
    "heart.fill": "favorite",
    gear: "settings",
    person: "person-outline",
    "person.fill": "person",
    calendar: "calendar-today",
    clock: "schedule",
    photo: "photo",
    camera: "photo-camera",
    magnifyingglass: "search",
    bell: "notifications-none",
    "bell.fill": "notifications",
    star: "star-outline",
    "star.fill": "star",
  };

export interface IconSymbolProps {
  name: keyof typeof ANDROID_WEB_MAPPING | (string & {});
  size?: number;
  color?: string;
}

export function IconSymbol({ name, size = 24, color }: IconSymbolProps) {
  if (Platform.OS === "ios") {
    // On iOS we could return the SF Symbol name via future native symbols API.
  }
  const mapped = ANDROID_WEB_MAPPING[name] || "help-outline";
  return <MaterialIcons name={mapped} size={size} color={color} />;
}
