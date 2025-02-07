import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ToastOptions, ToastProps } from "./types";
import { toastManager } from "./ToastManager";
import { ToastItem } from "./components/ToastItem";

export const ToastContainer: React.FC = () => {
  const [toastQueue, setToastQueue] = useState<ToastProps[]>([]);

  const showToast = useCallback((message: string, options?: ToastOptions) => {
    const toastId = Math.random().toString(36).substring(2, 9);
    setToastQueue((currentQueue) => [...currentQueue, { id: toastId, message, ...options }]);
  }, []);

  const removeToast = useCallback((toastId: string) => {
    setToastQueue((currentQueue) => currentQueue.filter((toast) => toast.id !== toastId));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToastQueue([]);
  }, []);

  useEffect(() => {
    toastManager.setHandlers(showToast, clearAllToasts);
  }, [showToast, clearAllToasts]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toastQueue.map((toast, index) => (
        <ToastItem key={toast.id} {...toast} style={[{ zIndex: 1000 + index }]} onDismiss={() => removeToast(toast.id)} />
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
