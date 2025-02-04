import { Root } from "./Root";
import { FieldLabel } from "./FieldLabel";
import { FieldContent } from "./FieldContent";
import { FieldError } from "./FieldError";

export const Field = {
  Root,
  Label: FieldLabel,
  Field: FieldContent,
  Error: FieldError,
};

export * from "./type";
