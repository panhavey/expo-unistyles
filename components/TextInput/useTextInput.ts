import { useState, useRef } from "react";
import { TextInput } from "react-native";

export const useTextInput = (value: string | undefined, onChangeText?: (text: string) => void) => {
  const [isFocused, setIsFocused] = useState(false);
  const innerInputRef = useRef<TextInput>(null);
  const [innerValue, setInnerValue] = useState(value);

  const handleFocus = (e: any, onFocus?: (e: any) => void) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any, onBlur?: (e: any) => void) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChangeText = (text: string) => {
    setInnerValue(text);
    onChangeText?.(text);
  };

  return {
    isFocused,
    innerValue,
    innerInputRef,
    handleFocus,
    handleBlur,
    handleChangeText,
  };
};