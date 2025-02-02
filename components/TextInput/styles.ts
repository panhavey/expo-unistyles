import { createStyleSheet } from "react-native-unistyles";

export const baseStyles = createStyleSheet((theme) => ({
  container: {
    gap: theme.spacing.xs,
  },
  inputContainer: {
    position: "relative",
  },
  base: {
    height: 40,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.typography,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.typography,
    marginBottom: 4,
  },
  placeholder: {
    color: theme.colors.placeholder,
  },
  error: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.error,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
}));
