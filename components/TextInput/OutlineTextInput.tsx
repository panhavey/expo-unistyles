import { TextInput as RNTextInput, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming, useSharedValue, Easing } from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import React, { forwardRef, useEffect } from "react";
import { Text } from "../Text";
import { CustomTextInputProps, TextInputRef } from "./types";
import { useInput } from "./InputContext";

export const OutlineTextInput = forwardRef<TextInputRef, CustomTextInputProps>(
  ({ style, label, error, placeholder, value, onChangeText, disabled, ...props }, ref) => {
    const { setIsFocused, value: ctxValue, setValue, isFocused } = useInput();
    const labelAnimation = useSharedValue(value ? 1 : 0);

    const shouldFloat = Boolean(ctxValue) || isFocused;

    const animatedLabelStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: withTiming(8 + labelAnimation.value * -33, { duration: 150 }) },
        { scale: withTiming(1 + labelAnimation.value * -0.25, { duration: 150 }) },
      ],
      opacity: withTiming(labelAnimation.value, { duration: 150 }),
    }));

    useEffect(() => {
      labelAnimation.value = withTiming(shouldFloat ? 1 : 0, {
        duration: 200,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
    }, [ctxValue, isFocused, shouldFloat]);

    const renderLabel = () => {
      if (!label) return null;

      const labelColor = error
        ? styles.error.color
        : isFocused
        ? styles.outlineVariantFocused.borderColor
        : shouldFloat
        ? styles.placeholder.color
        : styles.outlineVariant.borderColor;

      return (
        <Animated.Text style={[styles.floatingLabel, animatedLabelStyle, { color: labelColor }]}>
          <View style={styles.floatingLabelBackground}>
            <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
          </View>
        </Animated.Text>
      );
    };

    return (
      <>
        {renderLabel()}
        <RNTextInput
          ref={ref}
          editable={!disabled}
          placeholder={shouldFloat ? undefined : label}
          onFocus={(e) => {
            console.log("va", e.nativeEvent.text);
            setIsFocused?.(true);
          }}
          onBlur={() => setIsFocused?.(false)}
          value={ctxValue}
          onChangeText={setValue}
          {...props}
        />
      </>
    );
  }
);

OutlineTextInput.displayName = "OutlineTextInput";

const styles = StyleSheet.create((theme) => ({
  floatingLabel: {
    position: "absolute",
    left: theme.spacing.sm,
    top: theme.spacing.md,
    zIndex: 1,
  },
  floatingLabelBackground: {
    paddingHorizontal: 4,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
  },
  labelText: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  outlineVariant: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
  },
  outlineVariantFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  placeholder: {
    color: theme.colors.placeholder,
  },
  error: {
    color: theme.colors.error,
  },
}));
