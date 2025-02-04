import React from "react";
import { Text } from "../Text";
import { styles } from "./styles";

interface FieldErrorProps {
  error?: string;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error }) => {
  if (!error) return null;
  return <Text style={styles.error}>{error}</Text>;
};