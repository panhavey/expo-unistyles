import React from "react";
import { Text } from "../Text";
import { useField } from "./FieldContext";
import { FloatingLabel } from "./FloatingLabel";
import { fieldStyles } from "./styles";

interface FieldLabelProps {
  label?: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({ label }) => {
  if (!label) return null;

  const { variant, error, isFocused, value } = useField();

  fieldStyles.useVariants({
    focus: isFocused,
    error: !!error,
    outline: variant === "outline",
  });

  const labelComponent = <Text style={fieldStyles.label}>{label}</Text>;

  if (variant === "outline") {
    return (
      <FloatingLabel hasValue={!!value} isFocused={isFocused}>
        {labelComponent}
      </FloatingLabel>
    );
  }

  return labelComponent;
};
