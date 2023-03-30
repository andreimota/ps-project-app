import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {Button, Grid, Typography} from "@mui/material";
import { Container } from "@mui/system";

import { FieldValues, useForm } from "react-hook-form";
import BasicFormControl from "../../components/form-helpers/BasicFormControl";
import api from "../../api/api";
import {toast} from "react-toastify";

const RegisterPage = () => {
  const { control, handleSubmit, watch, formState: {errors} } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const navigate = useNavigate();

  const registerFormKeys = [
    { key: "firstName", label: "First Name", validation: { required: { value: true, message: "First name is required." }}},
    { key: "lastName", label: "Last Name", validation: { required: "Last name is required." }},
    { key: "email", label: "E-mail address", validation: { required: { value: true, message: "E-mail is required." } }},
    { key: "password", type: "password", label: "Password", validation: {
      required: "Password is required.",
      minLength: { value: 8, message: "Password must be at least 8 characters long." }
    }},
    // { key: "confirmPassword", type: "password", label: "Confirm password", validation: {
    //   required: "First name is required.",
    //   validate: ( password: string ) => password === watch("password") ? true : "Passwords do not match",
    // }},
  ];

  const handleFormSubmit = ( data: FieldValues ) => {
    api.post("/donor/register", data)
      .then(res => {
        localStorage.setItem("jwt", res);
        window.dispatchEvent(new Event("storage"));

        navigate("/donor-dashboard");
      })
      .catch(err => {
        toast(err.message, { type: "error"});
      });
  };

  return <form onSubmit={handleSubmit(handleFormSubmit)}>
    <Container maxWidth="xl" sx={{marginTop: "15rem"}}>
      <Grid container direction="row" justifyContent="space-evenly" className="registerForm">
        <Grid
          container
          item
          xs={12}
          md={6}
          direction="column"
          alignItems="center"

        >
          <Grid item className="registerText">
            <Typography variant="h3" className="title">Placeholder</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          md={6}
          rowSpacing={2.6}
          direction="column"
          alignItems="center"
        >
          {registerFormKeys.map(row => (
            <Grid key={row.key} item>
              <BasicFormControl
                name={row.key}
                control={control}
                displayText={row.label}
                type={row.type}
                variant="outlined"
                errors={errors}
              />
            </Grid>
          ))}
          <Grid item>
            <Button variant="contained" type="submit" sx={{width: "16rem", marginLeft:"2rem"}}>Register</Button>
            <Grid container direction="row" justifyContent="center" sx={{ width: "20em", paddingTop: "0.7em"}}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  </form>;
};

export default RegisterPage;