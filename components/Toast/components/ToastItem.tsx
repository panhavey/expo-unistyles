import React from "react";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Text } from "../../Text";
import { useToastGesture } from "../hooks/useToastGesture";
import { ProgressBar } from "./ProgressBar";
import { ToastItemProps } from "../types";
import { getToastIcon } from "../utils/icons";

export const ToastItem: React.FC<ToastItemProps> = ({
  message,
  type = "info",
  duration = 3000,
  position = "bottom",
  animation = "slide",
  showProgress,
  animationConfig,
  icon,
  action,
  onDismiss,
  style,
}) => {
  const { gesture, translateX, translateY, opacity, dismiss } = useToastGesture(onDismiss, position, animation, animationConfig);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dismiss();
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, dismiss, onDismiss]);

  const handleActionPress = () => {
    action?.onPress();
    dismiss();
  };

  styles.useVariants({ type, position });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, style, animatedStyle]}>
        <View style={styles.content}>
          {icon || getToastIcon(type)}
          <Text style={styles.message} numberOfLines={2}>
            {message}
          </Text>
          {action && (
            <Pressable onPress={handleActionPress} style={styles.actionButton}>
              <Text style={styles.actionText}>{action.label}</Text>
            </Pressable>
          )}
        </View>
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
    overflow: "hidden",
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.sm,
  },
  message: {
    flex: 1,
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
  },
  actionButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  actionText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
  },
}));
