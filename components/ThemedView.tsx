import { View, type ViewProps } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const { styles } = useStyles(stylesheet);

  return <View style={[styles.base, style]} {...otherProps} />;
}

const stylesheet = createStyleSheet((theme) => ({
  base: {
    backgroundColor: theme.colors.background,
  },
}));
