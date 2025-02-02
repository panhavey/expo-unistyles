import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Text } from "../Text";
import { Label } from "../Label";
import { InputProvider } from "./InputContext";

interface InputContainerProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  variant?: "default" | "outline";
  style?: any;
  isFocused?: boolean;
  disabled?: boolean;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  children,
  label,
  error,
  right,
  left,
  variant = "default",
  isFocused = false,
  disabled,
  style,
}) => {
  styles.useVariants({
    focus: isFocused,
  });

  return (
    <InputProvider variant={variant}>
      <View style={[styles.container, style]}>
        {label && <Label>{label}</Label>}
        <View style={styles.inputWrapper}>
          {left && <View style={styles.addon}>{left}</View>}
          <View style={styles.inputContainer}>
            <View style={[styles.border]}>{children}</View>
          </View>
          {right && <View style={styles.addon}>{right}</View>}
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </InputProvider>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  inputContainer: {
    position: "relative",
    flex: 1,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.typography,
    marginBottom: 4,
  },
  error: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error,
  },
  addon: {
    justifyContent: "center",
  },
  border: {
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.background,
    variants: {
      focus: {
        true: {
          borderColor: theme.colors.primary,
          borderWidth: 2,
        },
        false: {
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
      },
    },
  },
}));
