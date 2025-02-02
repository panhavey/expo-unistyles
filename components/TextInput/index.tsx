import React, { forwardRef } from "react";
import { DefaultTextInput } from "./DefaultTextInput";
import { OutlineTextInput } from "./OutlineTextInput";
import { CustomTextInputProps, TextInputRef } from "./types";
import { InputContainer } from "./InputContainer";

const TextInput = forwardRef<TextInputRef, CustomTextInputProps>(({ variant = "default", right, left, style, ...props }, ref) => {
  const input = variant === "outline" ? <OutlineTextInput {...props} ref={ref} /> : <DefaultTextInput {...props} ref={ref} />;

  return (
    <InputContainer variant={variant} right={right} left={left} label={props.label} error={props.error} style={style}>
      {input}
    </InputContainer>
  );
});

TextInput.displayName = "TextInput";

export * from "./types";
export default TextInput;
