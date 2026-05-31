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
  accent: {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    tertiary: "var(--color-tertiary)",
  },
  background: {
    primary: "var(--bg-primary)",
    secondary: "var(--bg-secondary)",
    tertiary: "var(--bg-tertiary)",
  },
  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    tertiary: "var(--text-tertiary)",
  },
} satisfies ThemeTokens;
