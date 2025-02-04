import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm * 1.5,
    height: 45,
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