import React, {Fragment, useEffect, useState} from "react";
import {Donor} from "../../types/Donor";
import BasicFormControl from "../form-helpers/BasicFormControl";
import {FieldValues, useForm} from "react-hook-form";
import SelectFormControl from "../form-helpers/SelectFormControl";
import {BloodType} from "../../types/BloodType";
import {SelectableType} from "../../types/Enums";
import {Box, Button, Paper, TextField} from "@mui/material";
import {Doctor} from "../../types/Doctor";
import {TransfusionCenter} from "../../types/TransfusionCenter";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import api from "../../api/api";
import {toast} from "react-toastify";

interface Props {
    setDialog: any
    transfusionCenters: TransfusionCenter[]
    donorId: string
    onSubmit: any
}

const CreateAppointmentForm = (props: Props) => {
  const [transfusionCenter, setTransfusionCenter] = useState(props.transfusionCenters?.[0].id);
  const [date, setDate] = useState(new Date());

  const handleChange = (e: any) => {
    const {name, value} = e.target;

    setTransfusionCenter(value);
  };

  const handleAppointmentBook = () => {
    props.onSubmit({
      transfusionCenterId: transfusionCenter,
      date: date.toLocaleDateString("EN-en"),
      donorId: props.donorId
    });
  };

  useEffect(() => {
    console.log(date);
  }, [date]);

  return <>
    <Box sx={{display: "flex", flexDirection: "column"}}>
      <FormControl>
        <FormLabel>Select a transfusion center</FormLabel>
        <RadioGroup
          defaultValue="female"
          name="controlled-radio-buttons-group"
          value={transfusionCenter}
          onChange={handleChange}
          sx={{my: 1, overflow: "auto", overflowX: "hidden", maxHeight: "300px"}}
        >
          {
            props.transfusionCenters.map((item: TransfusionCenter) => (
              <Fragment key={item.id}>
                <Radio value={item.id} label={item.name} sx={{marginTop: "1rem"}}/>
                <FormHelperText>{`${item.address}, Working hours: ${item.workingHours}`}</FormHelperText>
              </Fragment>
            ))
          }
        </RadioGroup>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          sx={{marginTop: "2rem"}}
          label="Appointment Date"
          value={date}
          onChange={(newValue) => {
            setDate(new Date(newValue as unknown as string));
          }}
        />
      </LocalizationProvider>

      <Button variant="contained" sx={{width: "100%", marginTop: "1rem"}} onClick={handleAppointmentBook}>Book</Button>
    </Box>
  </>;
};

export default CreateAppointmentForm;