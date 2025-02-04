import React from "react";
import { Label } from "../Label";
import { useField } from "./FieldContext";
import { FloatingLabel } from "./FloatingLabel";

interface FieldLabelProps {
  label?: string;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({ label }) => {
  const { variant } = useField();
  if (!label) return null;
  return variant === "outline" ? <FloatingLabel label={label} /> : <Label>{label}</Label>;
};