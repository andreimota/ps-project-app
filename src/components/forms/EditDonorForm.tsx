import React, {useEffect, useState} from "react";
import {Donor} from "../../types/Donor";
import BasicFormControl from "../form-helpers/BasicFormControl";
import {FieldValues, useForm} from "react-hook-form";
import SelectFormControl from "../form-helpers/SelectFormControl";
import {BloodType} from "../../types/BloodType";
import {SelectableType} from "../../types/Enums";
import { Button } from "@mui/material";

interface Props {
    onSubmit: (data: FieldValues) => void
    donor: Donor
}

const EditDonorForm = (props: Props) => {
  const [bloodTypes, setBloodTypes] = useState<SelectableType[]>([]);

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      id: props.donor.id,
      firstName: props.donor.firstName,
      lastName: props.donor.lastName,
      email: props.donor.email,
      password: "",
    }
  });

  useEffect(() => {
    reset();
  }, [props.donor]);

  const handleFormSubmit = (data: FieldValues) => {
    props.onSubmit(data);
  };
    
  return <form onSubmit={handleSubmit(handleFormSubmit)}>
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
    {/*<SelectFormControl*/}
    {/*  control={control}*/}
    {/*  displayText="Blood Type"*/}
    {/*  name="bloodTypeId"*/}
    {/*  variant="outlined"*/}
    {/*  selectOptions={bloodTypes}*/}
    {/*/>*/}
    <BasicFormControl
      control={control}
      displayText="Password"
      name="password"
      variant="outlined"
    />
    {/*<BasicFormControl*/}
    {/*  control={control}*/}
    {/*  displayText="Confirm password"*/}
    {/*  name="confirmPassword"*/}
    {/*  variant="outlined"*/}
    {/*/>*/}
    <Button type="submit" sx={{width: "100%", marginLeft: "1rem"}}variant="contained">Update information</Button>
  </form>;
};

export default EditDonorForm;