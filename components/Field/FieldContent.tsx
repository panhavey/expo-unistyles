import React from "react";
import { View } from "react-native";
import { useField } from "./FieldContext";
import { styles } from "./styles";
import { FieldContentProps } from "./type";

export const FieldContent: React.FC<FieldContentProps> = ({ children, left, right }) => {
  const { isFocused } = useField();
  styles.useVariants({ focus: isFocused });

  return (
    <View style={[styles.inputWrapper, styles.border]}>
      {left && <View style={styles.addon}>{left}</View>}
      <View style={styles.inputContainer}>{children}</View>
      {right && <View style={styles.addon}>{right}</View>}
    </View>
  );
};
