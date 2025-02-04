import { StyleProp, ViewStyle } from 'react-native';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastAnimation = 'spring' | 'ease' | 'bounce' | 'slide';

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  position?: 'top' | 'bottom';
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onPress: () => void;
  };
  animation?: ToastAnimation;
  animationConfig?: {
    duration?: number;
    damping?: number;
    stiffness?: number;
  };
}

export interface ToastItemProps extends Omit<ToastProps, 'id'> {
  onDismiss: () => void;
}

export interface ToastOptions extends Omit<ToastProps, 'message' | 'id'> {}

export interface ToastItem extends ToastProps {
  id: string;
}