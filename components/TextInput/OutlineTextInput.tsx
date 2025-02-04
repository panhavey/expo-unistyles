import { TextInput as RNTextInput } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import React, { forwardRef } from "react";
import { CustomTextInputProps, TextInputRef } from "./types";
import { useField } from "../Field/FieldContext";

export const OutlineTextInput = forwardRef<TextInputRef, CustomTextInputProps>(({ disabled, label, ...props }, ref) => {
  const { setIsFocused, value: ctxValue, setValue, isFocused } = useField();

  const shouldFloat = Boolean(ctxValue) || isFocused;

  return (
    <>
      <RNTextInput
        ref={ref}
        editable={!disabled}
        placeholder={shouldFloat ? undefined : label}
        onFocus={() => setIsFocused?.(true)}
        onBlur={() => setIsFocused?.(false)}
        value={ctxValue}
        onChangeText={setValue}
        {...props}
      />
    </>
  );
});

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
