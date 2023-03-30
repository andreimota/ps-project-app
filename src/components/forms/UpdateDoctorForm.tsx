import React, {useState} from "react";
import {Donor} from "../../types/Donor";
import BasicFormControl from "../form-helpers/BasicFormControl";
import {FieldValues, useForm} from "react-hook-form";
import SelectFormControl from "../form-helpers/SelectFormControl";
import {BloodType} from "../../types/BloodType";
import {SelectableType} from "../../types/Enums";
import {Box, Button} from "@mui/material";
import {Doctor} from "../../types/Doctor";
import {TransfusionCenter} from "../../types/TransfusionCenter";

interface Props {
    onSubmit: (data: FieldValues) => void
    doctor: Doctor
    transfusionCenters: { label: string, value: string }[]
}

const EditDoctorForm = (props: Props) => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      id: props.doctor?.id,
      firstName: props.doctor?.firstName,
      lastName: props.doctor?.lastName,
      email: props.doctor?.email,
      transfusionCenterId: props.doctor?.transfusionCenterId,
      password: ""
    }
  });

  const handleFormSubmit = (data: FieldValues) => {
    props.onSubmit(data);
  };

  return <form onSubmit={handleSubmit(handleFormSubmit)}>
    <Box sx={{display: "flex", width: "100%", flexDirection: "column"}}>
      <BasicFormControl
        control={control}
        displayText="First Name"
        name="firstName"
        variant="outlined"
      />
      <BasicFormControl
        control={control}
        displayText="Last Name"
        name="lastName"
        variant="outlined"
      />
      <BasicFormControl
        control={control}
        displayText="E-mail"
        name="email"
        variant="outlined"
      />
      <SelectFormControl
        control={control}
        name="transfusionCenterId"
        selectOptions={props.transfusionCenters}
        displayText="Transfusion Center"
      />
      <BasicFormControl
        control={control}
        displayText="Password"
        name="password"
        variant="outlined"
      />
    </Box>
    <Button type="submit" sx={{width: "100%", marginLeft: "1rem"}} variant="contained">Update information</Button>
  </form>;
};

export default EditDoctorForm;