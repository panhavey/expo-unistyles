import React, { createContext, useContext, useState } from "react";

interface InputContextType {
  variant: "default" | "outline";
  isFocused: boolean;
  disabled?: boolean;
  error?: string;
  value?: any;
  setIsFocused?: (focused: boolean) => void;
  setValue?: (value: any) => void;
}

const InputContext = createContext<InputContextType | null>({
  variant: "default",
  isFocused: false,
  //   setIsFocused: () => {},
  //   setValue: () => {},
});

export const useInput = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInput must be used within an InputProvider");
  }
  return context;
};

interface InputProviderProps {
  children: React.ReactNode;
  variant: "default" | "outline";
  disabled?: boolean;
  error?: string;
  label?: string;
}

export const InputProvider: React.FC<InputProviderProps> = ({ children, variant, disabled, error, label }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState();

  return (
    <InputContext.Provider
      value={{
        variant,
        isFocused,
        disabled,
        error,
        value,
        setIsFocused,
        setValue,
      }}
    >
      {children}
    </InputContext.Provider>
  );
};
