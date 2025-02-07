import { Text } from "react-native";
import { Pressable, type PressableProps } from "react-native-gesture-handler";
import { ReactNode } from "react";
import { StyleSheet } from "react-native-unistyles";

interface ButtonProps extends PressableProps {
  children: ReactNode;
  disabled?: boolean;
}

export const Button = ({ onPress, onLongPress, children, disabled, ...rest }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, disabled && styles.buttonDisabled]}
      hitSlop={8}
      {...rest}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ scale: 1 }],
  },
  buttonPressed: {
    backgroundColor: theme.colors.primary,
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    backgroundColor: theme.colors.contentMuted,
    opacity: 0.5,
  },
  text: {
    color: "#FFFFFF",
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  textDisabled: {
    color: "rgba(255, 255, 255, 0.7)",
  },
}));
