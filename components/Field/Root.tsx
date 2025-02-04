import React from "react";
import { View } from "react-native";
import { FieldProvider } from "./FieldContext";
import { FieldProps } from "./type";
import { styles } from "./styles";

export const Root: React.FC<FieldProps> = ({ 
  children, 
  error, 
  variant = "default", 
  disabled, 
  style 
}) => (
  <FieldProvider variant={variant} disabled={disabled} error={error}>
    <View style={[styles.container, style]}>{children}</View>
  </FieldProvider>
);