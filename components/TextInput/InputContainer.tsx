import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '../Text';

interface InputContainerProps {
  children: React.ReactNode;
  label?: string;
  error?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  variant?: 'default' | 'outline';
  style?: any;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  children,
  label,
  error,
  right,
  left,
  variant = 'default',
  style,
}) => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.container, style]}>
      {variant !== 'outline' && label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {left && <View style={styles.addon}>{left}</View>}
        <View style={styles.inputContainer}>{children}</View>
        {right && <View style={styles.addon}>{right}</View>}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    gap: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  inputContainer: {
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
    justifyContent: 'center',
  },
}));