import React from "react";
import { Text } from "../Text";
import { useField } from "./FieldContext";
import { FloatingLabel } from "./FloatingLabel";
import { styles } from "./styles";

interface FieldLabelProps {
  label?: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({ label }) => {
  if (!label) return null;

  const { variant, error, isFocused, value } = useField();

  styles.useVariants({
    focus: isFocused,
    error: !!error,
    outline: variant === "outline",
  });

  const labelComponent = <Text style={styles.label}>{label}</Text>;

  if (variant === "outline") {
    return (
      <FloatingLabel hasValue={!!value} isFocused={isFocused}>
        {labelComponent}
      </FloatingLabel>
    );
  }

  return labelComponent;
};
