import React from "react";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Text } from "../Text";
import { ProgressBar } from "./components/ProgressBar";
import { useToastGesture } from "./hooks/useToastGesture";
import { ToastItemProps } from "./types";

export const ToastItem: React.FC<ToastItemProps> = ({
  message,
  type = "info",
  duration = 3000,
  position = "bottom",
  animation = "ease",
  showProgress,
  animationConfig,
  icon,
  action,
  onDismiss,
  style,
}) => {
  const { gesture, translateX, translateY, opacity, dismiss } = useToastGesture(onDismiss, position, animation, animationConfig);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dismiss();
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, dismiss, onDismiss]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  styles.useVariants({ type, position });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, style, animatedStyle]}>
        {icon}
        <Text style={styles.message}>{message}</Text>
        {action && (
          <Pressable onPress={action.onPress}>
            <Text style={styles.actionText}>{action.label}</Text>
          </Pressable>
        )}
        {showProgress && <ProgressBar duration={duration} onComplete={onDismiss} />}
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
    overflow: "hidden",
    // ...theme.shadows.md,
    variants: {
      type: {
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
      },
      position: {
        top: {
          top: theme.spacing.xl,
        },
        bottom: {
          bottom: theme.spacing.xl,
        },
      },
    },
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
