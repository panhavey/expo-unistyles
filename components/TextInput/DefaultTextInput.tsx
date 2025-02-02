import { TextInput as RNTextInput, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import React, { forwardRef } from "react";
import { Text } from "../Text";
import { CustomTextInputProps, TextInputRef } from "./types";
import { useTextInput } from "./useTextInput";
import { baseStyles } from "./styles";

export const DefaultTextInput = forwardRef<TextInputRef, CustomTextInputProps>(
  ({ style, label, error, placeholder, value, onChangeText, disabled, ...props }, ref) => {
    const { styles } = useStyles(stylesheet);
    const { isFocused, innerValue, innerInputRef, handleFocus, handleBlur, handleChangeText } = useTextInput(value, onChangeText);

    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputContainer}>
          <View style={[styles.defaultVariant, isFocused && !disabled && styles.defaultVariantFocused, error && styles.errorInput]}>
            <RNTextInput
              ref={ref}
              editable={!disabled}
              style={[styles.base, { borderWidth: 0 }]}
              placeholder={placeholder}
              placeholderTextColor={styles.placeholder.color}
              onFocus={(e) => handleFocus(e, props?.onFocus)}
              onBlur={(e) => handleBlur(e, props?.onFocus)}
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

DefaultTextInput.displayName = "DefaultTextInput";

const stylesheet = createStyleSheet((theme) => ({
  ...baseStyles(theme),
  defaultVariant: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background,
  },
  defaultVariantFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
}));
