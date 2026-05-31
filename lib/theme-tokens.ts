export interface ThemeScale {
  primary: string;
  secondary: string;
  tertiary: string;
}

export interface ThemeTokens {
  accent: ThemeScale;
  background: ThemeScale;
  text: ThemeScale;
}

export const themeTokens = {
  day: {
    accent: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      tertiary: "var(--color-tertiary)",
    },
    background: {
      primary: "var(--color-background-primary)",
      secondary: "var(--color-background-secondary)",
      tertiary: "var(--color-background-tertiary)",
    },
    text: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      tertiary: "var(--color-text-tertiary)",
    },
  },
  night: {
    accent: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      tertiary: "var(--color-tertiary)",
    },
    background: {
      primary: "var(--color-background-primary)",
      secondary: "var(--color-background-secondary)",
      tertiary: "var(--color-background-tertiary)",
    },
    text: {
      primary: "var(--color-text-primary)",
      secondary: "var(--color-text-secondary)",
      tertiary: "var(--color-text-tertiary)",
    },
  },
} satisfies Record<"day" | "night", ThemeTokens>;

export type ThemeName = keyof typeof themeTokens;
