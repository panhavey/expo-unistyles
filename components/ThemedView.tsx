import { View, type ViewProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export type ThemedViewProps = ViewProps;

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  return <View style={[styles.base, style]} {...otherProps} />;
}

const styles = StyleSheet.create((theme) => ({
  base: {
    backgroundColor: theme.colors.base,
  },
}));
