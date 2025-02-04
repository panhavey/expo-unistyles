import { TextInput as RNTextInput } from "react-native";
import React, { forwardRef } from "react";
import { CustomTextInputProps, TextInputRef } from "./types";
import { useField } from "../Field/FieldContext";

export const DefaultTextInput = forwardRef<TextInputRef, CustomTextInputProps>(
  ({ style, label, error, placeholder, value, onChangeText, disabled, ...props }, ref) => {
    const { setIsFocused, value: ctxValue, setValue } = useField();

    return (
      <>
        <RNTextInput
          ref={ref}
          editable={!disabled}
          placeholder={placeholder}
          // placeholderTextColor={styles.placeholder.color}
          onFocus={() => setIsFocused?.(true)}
          onBlur={() => setIsFocused?.(false)}
          value={ctxValue}
          onChangeText={setValue}
          {...props}
        />
      </>
    );
  }
);

DefaultTextInput.displayName = "DefaultTextInput";
