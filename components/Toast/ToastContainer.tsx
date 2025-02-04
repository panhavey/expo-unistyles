import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ToastOptions, ToastProps } from "./types";
import { ToastItem } from "./components/ToastItem";
import { toastManager } from "./ToastManager";

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const show = useCallback((message: string, options?: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, ...options }]);
  }, []);

  const hide = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    toastManager.setHandlers(show, () => setToasts([]));
  }, [show]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map((toast, index) => (
        <ToastItem key={toast.id} {...toast} style={[{ zIndex: 1000 + index }]} onDismiss={() => hide(toast.id)} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create((_, rt) => ({
  container: {
    position: "absolute",
    left: rt.insets.right,
    right: rt.insets.left,
    top: rt.insets.top,
    bottom: rt.insets.bottom,
  },
}));
