import React, { useEffect } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Text } from "../Text";
import { useField } from "./FieldContext";

interface FloatingLabelProps {
  label: string;
}

export const FloatingLabel: React.FC<FloatingLabelProps> = ({ label }) => {
  const { error, isFocused, value: ctxValue } = useField();

  if (!label) return null;
  const shouldFloat = Boolean(ctxValue) || isFocused;

  const _labelAnimation = useSharedValue(ctxValue ? 1 : 0);

  useEffect(() => {
    _labelAnimation.value = withTiming(shouldFloat ? 1 : 0, {
      duration: 200,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [shouldFloat]);

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(8 + _labelAnimation.value * -33, { duration: 150 }) },
      { scale: withTiming(1 + _labelAnimation.value * -0.25, { duration: 150 }) },
    ],
    opacity: withTiming(_labelAnimation.value, { duration: 150 }),
  }));

  const labelColor = error
    ? styles.error.color
    : isFocused
    ? styles.outlineVariantFocused.borderColor
    : shouldFloat
    ? styles.placeholder.color
    : styles.outlineVariant.borderColor;

  return (
    <Animated.View style={[styles.floatingLabel, animatedLabelStyle]}>
      <View style={styles.floatingLabelBackground}>
        <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create((theme) => ({
  floatingLabel: {
    position: "absolute",
    left: theme.spacing.sm,
    top: 12,
    zIndex: 2,
  },
  floatingLabelBackground: {
    paddingHorizontal: theme.spacing.xs,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
  },
  labelText: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  outlineVariant: {
    borderColor: theme.colors.border,
  },
  outlineVariantFocused: {
    borderColor: theme.colors.primary,
  },
  placeholder: {
    color: theme.colors.placeholder,
  },
  error: {
    color: theme.colors.error,
  },
}));
