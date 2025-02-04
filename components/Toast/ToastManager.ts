import { ToastOptions } from "./types";

class ToastManager {
  private static instance: ToastManager;
  private showCallback: ((message: string, options?: ToastOptions) => void) | null = null;
  private hideCallback: (() => void) | null = null;

  private constructor() {}

  static getInstance() {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  setHandlers(show: (message: string, options?: ToastOptions) => void, hide: () => void) {
    this.showCallback = show;
    this.hideCallback = hide;
  }

  show(message: string, options?: ToastOptions) {
    this.showCallback?.(message, options);
  }

  hide() {
    this.hideCallback?.();
  }
}

export const toastManager = ToastManager.getInstance();

export const toast = {
  show: (message: string, options?: ToastOptions) => toastManager.show(message, options),
  hide: () => toastManager.hide(),
  success: (message: string, options?: Omit<ToastOptions, "type">) => toastManager.show(message, { ...options, type: "success" }),
  error: (message: string, options?: Omit<ToastOptions, "type">) => toastManager.show(message, { ...options, type: "error" }),
  info: (message: string, options?: Omit<ToastOptions, "type">) => toastManager.show(message, { ...options, type: "info" }),
  warning: (message: string, options?: Omit<ToastOptions, "type">) => toastManager.show(message, { ...options, type: "warning" }),
};
