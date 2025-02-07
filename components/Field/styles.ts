import { StyleSheet } from "react-native-unistyles";

export const fieldStyles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.xs,
    height: 45,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    height: "100%",
    backgroundColor: theme.colors.base,
  },
  inputContainer: {
    position: "relative",
    flex: 1,
  },
  label: {
    fontSize: theme.typography.fontSize.xs,
    marginBottom: 4,
    includeFontPadding: false,
    textAlignVertical: "center",
    color: theme.colors.content,
    variants: {
      error: {
        true: {
          color: theme.colors.error,
        },
      },
      focus: {
        true: {
          color: theme.colors.primary,
        },
      },
      outline: {
        true: {
          color: theme.colors.placeholder,
        },
      },
    },
    compoundVariants: [
      {
        focus: true,
        outline: true,
        styles: {
          color: theme.colors.primary,
        },
      },
    ],
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
    variants: {
      focus: {
        true: {
          borderColor: theme.colors.primary,
          borderWidth: 2,
        },
        false: {
          borderWidth: 1,
          borderColor: theme.colors.borderDefault,
        },
      },
    },
  },
}));
