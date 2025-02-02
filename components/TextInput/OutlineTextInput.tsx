import { TextInput as RNTextInput, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming, useSharedValue, Easing } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import React, { forwardRef, useEffect } from "react";
import { Text } from "../Text";
import { CustomTextInputProps, TextInputRef } from "./types";
import { useTextInput } from "./useTextInput";
import { baseStyles } from "./styles";

export const OutlineTextInput = forwardRef<TextInputRef, CustomTextInputProps>(
  ({ style, label, error, placeholder, value, onChangeText, disabled, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const { isFocused, innerValue, innerInputRef, handleFocus, handleBlur, handleChangeText } = useTextInput(value, onChangeText);
    const labelAnimation = useSharedValue(value ? 1 : 0);

    const shouldFloat = Boolean(innerValue) || isFocused;

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
    }, [innerValue, isFocused, shouldFloat]);

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
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {renderLabel()}
          <View style={[styles.outlineVariant, isFocused && !disabled && styles.outlineVariantFocused, error && styles.errorInput]}>
            <RNTextInput
              ref={ref}
              editable={!disabled}
              style={[styles.base, { borderWidth: 0 }]}
              placeholder={shouldFloat ? undefined : label}
              placeholderTextColor={styles.placeholder.color}
              onFocus={(e) => handleFocus(e, props?.onFocus)}
              onBlur={(e) => handleBlur(e, props?.onBlur)}
              value={innerValue}
              onChangeText={handleChangeText}
              {...props}
            />
          </View>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

OutlineTextInput.displayName = "OutlineTextInput";

const stylesheet = createStyleSheet((theme) => ({
  ...baseStyles(theme),
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
}));
