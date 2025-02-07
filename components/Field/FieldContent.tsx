import React from "react";
import { View } from "react-native";
import { useField } from "./FieldContext";
import { fieldStyles } from "./styles";
import { FieldContentProps } from "./type";
import { StyleSheet } from "react-native-unistyles";

export const FieldContent: React.FC<FieldContentProps> = ({ children, left, right }) => {
  const { isFocused } = useField();
  fieldStyles.useVariants({ focus: isFocused });

  return (
    <View style={[fieldStyles.inputWrapper, fieldStyles.border]}>
      {left && <View style={fieldStyles.addon}>{left}</View>}
      <View style={fieldStyles.inputContainer}>{children}</View>
      {right && <View style={fieldStyles.addon}>{right}</View>}
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  border: {
    borderRadius: theme.borderRadius.sm,
    variants: {
      focus: {
        true: {
          borderColor: theme.colors.primary,
          borderWidth: 2,
        },
        false: {
          borderWidth: 1,
          borderColor: theme.colors.borderDefault,
        },
      },
    },
  },
}));
