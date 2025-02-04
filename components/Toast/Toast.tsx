import React, { useEffect } from "react";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import Animated, { useAnimatedStyle, withSpring, withTiming, runOnJS, useSharedValue } from "react-native-reanimated";
import { Text } from "../Text";
import { ToastProps } from "./types";

interface ToastComponentProps extends ToastProps {
  onHide?: () => void;
}

export const Toast: React.FC<ToastComponentProps> = ({
  message,
  type = "info",
  duration = 3000,
  position = "bottom",
  style,
  icon,
  action,
  onHide,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(position === "top" ? -100 : 100);

  useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withSpring(0);

    const timer = setTimeout(() => {
      hide();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hide = () => {
    opacity.value = withTiming(0, { duration: 300 }, (finished) => {
      if (finished && onHide) {
        runOnJS(onHide)();
      }
    });
    translateY.value = withTiming(position === "top" ? -100 : 100);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, styles[type], style, animatedStyle]}>
      {icon}
      <Text style={styles.message}>{message}</Text>
      {action && (
        <Pressable onPress={action.onPress}>
          <Text style={styles.actionText}>{action.label}</Text>
        </Pressable>
      )}
    </Animated.View>
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
    backgroundColor: theme.colors.background,
    ...theme.shadows.md,
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
