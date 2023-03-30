import React from "react";

import {RegisterOptions} from "react-hook-form/dist/types/validator";
import {Controller, FieldErrors, FieldPath, FieldValues} from "react-hook-form";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";

interface Props {
    control: any;
    name: string;
    rules?: Omit<RegisterOptions<FieldValues, FieldPath<any>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
    errors?: FieldErrors;
    variant?: "outlined" | "standard";
    disabled?: boolean;
    selectOptions: { label: string, value: string | number }[];
    displayText?: string;
}

const SelectFormControl = (props: Props) => {
  return (
    <Box sx={{width: "100%", mx: "1rem", my:"1rem"}}>
      <FormControl sx={{width: "100%"}} variant={"filled"}>
        <InputLabel id="select-label">{props.displayText}</InputLabel>
        <Controller
          render={({field}) => (
            <Select {...field} variant={props.variant} disabled={props.disabled} labelId='select-label'>
              {props.selectOptions.map((selectOption) => (
                <MenuItem key={selectOption.value} value={selectOption.value}>
                  {selectOption.label}
                </MenuItem>
              ))}
            </Select>
          )}
          name={props.name}
          control={props.control}
          rules={props.rules}
        />

        {props.errors?.[props.name] && (
          <Typography variant="caption" sx={{color: "red"}}>
            {props.errors?.[props.name]?.message?.toString()}
          </Typography>
        )}
      </FormControl>
    </Box>

  );
};

export default SelectFormControl;