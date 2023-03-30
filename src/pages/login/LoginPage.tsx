import React, { ChangeEvent, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {Button, Container, Grid, Typography} from "@mui/material";

import BasicFormControl from "../../components/form-helpers/BasicFormControl";
import {FieldValues, useForm} from "react-hook-form";
import api from "../../api/api";
import jwtDecode from "jwt-decode";
import {AccountType, JwtKeys} from "../../router/useAuth";
import {toast} from "react-toastify";


const LoginPage = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if(jwt) {
      const token: JwtKeys = jwtDecode(jwt);
      navigateToUserDashboard(parseInt(token.accountType));
    }
  }, []);

  const submitLogin = (data: FieldValues) => {
    api.post("/user/authenticate", data)
      .then(res => {
        localStorage.setItem("jwt", res);
        window.dispatchEvent(new Event("storage"));

        const token: JwtKeys = jwtDecode(res);

        navigateToUserDashboard(parseInt(token.accountType));
      })
      .catch(err => {
        toast.error("Invalid username or password.");
      });
  };

  function navigateToUserDashboard(accountType: number) {
    switch(accountType) {
    case AccountType.ADMIN: navigate("/admin-dashboard"); break;
    case AccountType.DOCTOR: navigate("/doctor-dashboard"); break;
    case AccountType.DONOR: navigate("/donor-dashboard"); break;
    }
  }

  return <form onSubmit={handleSubmit(submitLogin)}>
    <Container maxWidth="xs">
      <Grid container direction="column" alignItems="center" sx={{margin: "20rem auto"}}>
        <Grid item>
          <BasicFormControl
            control={control}
            displayText="E-mail"
            name="email"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <BasicFormControl
            control={control}
            displayText="Password"
            name="password"
            variant="outlined"
            type="password"
          />
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit">Login</Button>
        </Grid>
        <Grid item>
          <Link to="/register">Sign up</Link>
        </Grid>
      </Grid>
    </Container>
  </form>;
};

export default LoginPage;