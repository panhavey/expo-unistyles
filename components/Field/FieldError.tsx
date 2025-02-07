import React from "react";
import { Text } from "../Text";
import { fieldStyles } from "./styles";

interface FieldErrorProps {
  error?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error }) => {
  if (!error) return null;
  return <Text style={fieldStyles.error}>{error}</Text>;
};
