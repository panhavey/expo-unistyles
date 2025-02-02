import { TextInput as RNTextInput, View } from "react-native";
import React, { forwardRef } from "react";
import { CustomTextInputProps, TextInputRef } from "./types";

import { useInput } from "./InputContext";

export const DefaultTextInput = forwardRef<TextInputRef, CustomTextInputProps>(
  ({ style, label, error, placeholder, value, onChangeText, disabled, ...props }, ref) => {
    const { setIsFocused, value: ctxValue, setValue } = useInput();

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

        {/* {error && <Text style={styles.error}>{error}</Text>} */}
      </>
    );
  }
);

DefaultTextInput.displayName = "DefaultTextInput";
