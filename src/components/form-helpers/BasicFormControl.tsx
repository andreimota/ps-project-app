import React from "react";

import { Controller, FieldErrors, FieldPath, FieldValues } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

interface Props {
    control: any;
    name: string;
    displayText: string;
    rules?: Omit<
        RegisterOptions<FieldValues, FieldPath<any>>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >;
    errors?: FieldErrors;
    type?: string;
    variant?: "outlined" | "standard";
    disabled?: boolean;
    multiline?: boolean;
    rows?: number;
}

const BasicFormControl = (props: Props) => {
  return (
    <Box sx={{ width: "100%", mx: "1rem" }}>
      <Controller
        name={props.name}
        rules={props.rules}
        control={props.control}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ width: "100%", my: "1rem" }}
            label={props.displayText}
            variant={props.variant || "standard"}
            error={!!props.errors?.[props.name] || false}
            type={props.type || "text"}
            disabled={props.disabled || false}
            multiline={props.multiline || false}
            rows={props.rows || 1}
            helperText={props.errors?.[props.name]?.message?.toString()}
          />
        )}
      />
    </Box>
  );
};

export default BasicFormControl;
