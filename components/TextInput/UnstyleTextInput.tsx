import { TextInput as RNTextInput, TextInputProps } from "react-native";
import React, { forwardRef } from "react";
import { CustomTextInputProps, TextInputRef } from "./types";
import { useField } from "../Field/FieldContext";

type UnstyledInputProps = Omit<CustomTextInputProps, "variant">;

export const UnstyleTextInput = forwardRef<TextInputRef, UnstyledInputProps>(({ disabled, onFocus, onBlur, placeholder, label, ...props }, ref) => {
  const { setIsFocused, value, setValue, variant, isFocused } = useField();

  const handleFocus = React.useCallback(
    (e: any) => {
      setIsFocused?.(true);
      onFocus?.(e);
    },
    [onFocus, setIsFocused]
  );

  const handleBlur = React.useCallback(
    (e: any) => {
      setIsFocused?.(false);
      onBlur?.(e);
    },
    [onBlur, setIsFocused]
  );

  const showPlaceholder = !isFocused || variant !== "outline";
  const placeholderText = variant === "outline" ? label : placeholder;

  return (
    <RNTextInput
      ref={ref}
      editable={!disabled}
      placeholder={showPlaceholder ? placeholderText : undefined}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      onChangeText={setValue}
      {...props}
    />
  );
});

UnstyleTextInput.displayName = "UnstyleTextInput";
