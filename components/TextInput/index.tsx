import { forwardRef } from "react";
import { CustomTextInputProps, TextInputRef } from "./types";
import { OutlineTextInput } from "./OutlineTextInput";
import { DefaultTextInput } from "./DefaultTextInput";
import { Field } from "../Field";

const TextInput = forwardRef<TextInputRef, CustomTextInputProps>(({ variant = "default", right, left, style, ...props }, ref) => {
  const input = variant === "outline" ? <OutlineTextInput {...props} ref={ref} /> : <DefaultTextInput {...props} ref={ref} />;

  return (
    <Field.Root variant="outline" error={props.error}>
      <Field.Label label={props.label} />
      <Field.Field left={left} right={right}>
        {input}
      </Field.Field>
      <Field.Error error={props.error} />
    </Field.Root>
  );
});

export default TextInput;
