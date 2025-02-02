import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export type ThemedTextProps = RNTextProps & {
  type?: "title" | "subtitle" | "caption" | "button";
  lang?: "en" | "kh";
};

export function Text({ style, type, lang = "en", ...rest }: ThemedTextProps) {
  const { styles } = useStyles(stylesheet, {
    type,
  });

  return <RNText style={[styles.base, styles.text, styles.extraStyle(lang, type), style]} {...rest} />;
}

const stylesheet = createStyleSheet((theme) => ({
  base: {
    color: theme.colors.typography,
  },
  text: {
    variants: {
      type: {
        default: {
          fontSize: theme.typography.fontSize.md,
          // lineHeight: 24,
        },
        title: {
          fontSize: theme.typography.fontSize.xxl,
          // lineHeight: 32,
        },
        subtitle: {
          fontSize: theme.typography.fontSize.lg,
        },
        caption: {
          fontSize: theme.typography.fontSize.xs,
          // lineHeight: 16,
        },
        button: {
          fontSize: theme.typography.fontSize.md,
          textAlign: "center",
        },
      },
    },
  },
  extraStyle: (lang: ThemedTextProps["lang"], type?: ThemedTextProps["type"]) => {
    const fontMap = {
      default: {
        en: "Inter_400Regular",
        kh: "KantumruyPro_400Regular",
      },
      title: {
        en: "Inter_700Bold",
        kh: "KantumruyPro_700Bold",
      },
      subtitle: {
        en: "Inter_700Bold",
        kh: "KantumruyPro_700Bold",
      },
      caption: {
        en: "Inter_400Regular",
        kh: "KantumruyPro_400Regular",
      },
      button: {
        en: "Inter_600SemiBold",
        kh: "KantumruyPro_600SemiBold",
      },
    } as const;

    const selectedType = type && type in fontMap ? type : "default";
    const selectedLang = lang && lang in fontMap[selectedType] ? lang : "kh";

    return { fontFamily: fontMap[selectedType][selectedLang] };
  },
}));
