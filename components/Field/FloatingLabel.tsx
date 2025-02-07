import React from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Animated, { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";

interface FloatingLabelProps {
  children: React.ReactNode;
  hasValue: boolean;
  isFocused: boolean;
  labelStyle?: StyleProp<TextStyle>;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({ children, isFocused, hasValue, labelStyle }) => {
  const shouldFloat = hasValue || isFocused;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(shouldFloat ? 1 : 0, {
      duration: 120,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    }),
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.wrapper}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    position: "absolute",
    left: theme.spacing.sm,
    top: -8,
    zIndex: 2,
  },
  wrapper: {
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.base,
    justifyContent: "center",
  },
}));
