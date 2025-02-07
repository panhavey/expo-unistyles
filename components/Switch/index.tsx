// More information check: https://docs.swmansion.com/react-native-reanimated/examples/switch
import React from "react";
import { Pressable } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  style?: any;
  duration?: number;
  trackColors?: { on: string; off: string };
}

const Switch: React.FC<SwitchProps> = ({ value: externalValue, onChange, style, duration = 300, trackColors }) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const internalValue = useSharedValue(externalValue ?? false);
  const { theme } = useUnistyles(); //TODO: refactor to not use hook

  const defaultTrackColors = {
    on: theme.colors.primary,
    off: theme.colors.interactiveDisabled,
    ...trackColors,
  };

  const handlePress = () => {
    const newValue = !internalValue.value;
    internalValue.value = newValue;
    onChange?.(newValue);
  };

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(Number(internalValue.value), [0, 1], [defaultTrackColors.off, defaultTrackColors.on]);
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(internalValue.value), [0, 1], [0, width.value - height.value]);
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[styles.track, style, trackAnimatedStyle]}
      >
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  track: {
    alignItems: "flex-start",
    width: theme.spacing.xl * 2,
    height: theme.spacing.xl,
    padding: theme.spacing.xs,
  },
  thumb: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: theme.colors.base,
  },
}));

export default Switch;
