import { StyleSheet } from "react-native-unistyles";
import { Text, TextProps } from "./Text";

interface LabelProps extends TextProps {
  error?: boolean;
  isFocused?: boolean;
}

export const Label: React.FC<LabelProps> = ({ error, isFocused, ...props }) => {
  styles.useVariants({
    color: error ? "error" : isFocused ? "focus" : undefined,
  });

  return <Text style={styles.label} {...props} />;
};

const styles = StyleSheet.create((theme) => ({
  label: {
    fontSize: theme.typography.fontSize.sm,
    marginBottom: 4,
    variants: {
      color: {
        error: {
          backgroundColor: theme.colors.error,
        },
        focus: {
          backgroundColor: theme.colors.primary,
        },
        default: {
          backgroundColor: theme.colors.typography,
        },
      },
    },
  },
}));
