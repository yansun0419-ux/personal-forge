export const themeModes = ["day", "night"] as const;

export type ThemeMode = (typeof themeModes)[number];

export function getNextThemeMode(theme: ThemeMode): ThemeMode {
  return theme === "day" ? "night" : "day";
}
