import React from "react";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Text } from "../../Text";
import { useToastGesture } from "../hooks/useToastGesture";
import { ProgressBar } from "./ProgressBar";
import { ToastItemProps } from "../types";

export const ToastItem: React.FC<ToastItemProps> = ({
  message,
  type = "info",
  duration = 3000,
  position = "bottom",
  animation = "ease",
  animationConfig,
  icon,
  action,
  onDismiss,
  style,
}) => {
  const { gesture, translateX, translateY, opacity } = useToastGesture(onDismiss, position, animation, animationConfig);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, styles[type], styles[position], style, animatedStyle]}>
        {icon}
        <Text style={styles.message}>{message}</Text>
        {action && (
          <Pressable onPress={action.onPress}>
            <Text style={styles.actionText}>{action.label}</Text>
          </Pressable>
        )}
        <ProgressBar duration={duration} onComplete={onDismiss} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    position: "absolute",
    left: theme.spacing.md,
    right: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
    ...theme.shadows.md,
  },
  top: {
    top: theme.spacing.xl,
  },
  bottom: {
    bottom: theme.spacing.xl,
  },
  success: {
    backgroundColor: theme.colors.success,
  },
  error: {
    backgroundColor: theme.colors.error,
  },
  info: {
    backgroundColor: theme.colors.primary,
  },
  warning: {
    backgroundColor: theme.colors.warning,
  },
  message: {
    flex: 1,
    color: theme.colors.white,
  },
  actionText: {
    color: theme.colors.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
}));
