import React from "react";
import { View } from "react-native";
import { FieldProvider } from "./FieldContext";
import { FieldProps } from "./type";
import { fieldStyles } from "./styles";

export const Root: React.FC<FieldProps> = ({ children, error, variant = "default", disabled, style }) => (
  <FieldProvider variant={variant} disabled={disabled} error={error}>
    <View style={[fieldStyles.container, style]}>{children}</View>
  </FieldProvider>
);
