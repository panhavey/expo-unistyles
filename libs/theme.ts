import { colors } from "./color";

const baseTheme = {
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 32,
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
} as const;

export const lightTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    typography: "#000000",
    background: "#ffffff",
    border: "#E5E5EA",
    card: "#FFFFFF",
    inactive: "#E5E5EA",
    placeholder: "#8E8E93",
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
} as const;

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    typography: "#E1E1E1",
    background: "#121212",
    border: "#2C2C2E",
    card: "#1E1E1E",
    inactive: "#3A3A3C",
    placeholder: "#8E8E93",
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2.0,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.35,
      shadowRadius: 4.84,
      elevation: 7,
    },
  },
} as const;
