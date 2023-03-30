import React, {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Container, Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography
} from "@mui/material";
import EditDonorForm from "../../components/forms/EditDonorForm";
import useAuth from "../../router/useAuth";
import {Donor} from "../../types/Donor";
import api from "../../api/api";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Close} from "@mui/icons-material";
import CreateDoctorForm from "../../components/forms/CreateDoctorForm";
import {AppointmentStatus, TransfusionCenter} from "../../types/TransfusionCenter";
import CreateAppointmentForm from "../../components/forms/CreateAppointmentForm";
import {Doctor} from "../../types/Doctor";
import {Appointment} from "../../types/Appointment";
import dayjs from "dayjs";

const DonorDashboard = () => {
  const [donor, setDonor] = useState<Donor>({} as Donor);
  const [appointments, setAppointments] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [appointmentBookingDialogOpen, setAppointmentBookingDialogOpen] = useState(false);
  const [transfusionCenters, setTransfusionCenters] = useState<any>([]);

  const userInfo = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/donor/${userInfo?.id}`)
      .then(res => {
        setDonor(res);
        setLoading(false);
      })
      .catch(err => {
        console.error(err.message);
      });

    api.get("/transfusionCenter")
      .then(res => {
        setTransfusionCenters(res);
      })
      .catch(err => {
        console.error(err.message);
      });

    api.get(`/appointment/donor/${userInfo?.id}`)
      .then(res => {
        setAppointments(res);
      })
      .catch(err => {
        console.error(err.message);
      });
  }, []);

  const handleAppointmentDialogOpen = () => {
    setAppointmentBookingDialogOpen(true);
  };

  const handleAppointmentDialogClose = () => {
    setAppointmentBookingDialogOpen(false);
  };

  const handleDonorUpdate = (data: FieldValues) => {
    api.put("/donor", { ...data, id: userInfo?.id })
      .then(res => {
        toast("Update was successful", { type: "success"});
      });
  };

  const handleRemoveAccount = () => {
    api.remove(`/donor/${userInfo?.id}`)
      .then(res => {
        toast.success("Account was removed successfully.");
        localStorage.removeItem("jwt");
        navigate("/login");
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleAppointmentBook = (data: any) => {
    api.post("/appointment", data)
      .then(res => {
        toast.success("Appointment booked successfully.");

        api.get(`/appointment/donor/${userInfo?.id}`)
          .then(res => {
            setAppointments(res);
          })
          .catch(err => {
            console.error(err.message);
          });
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleAppointmentCancel = (id: string) => () => {
    api.put(`/appointment/${id}/2`)
      .then(res => {
        toast.success("Appointment cancelled successfully.");

        api.get(`/appointment/donor/${userInfo?.id}`)
          .then(res => {
            setAppointments(res);
          })
          .catch(err => {
            console.error(err.message);
          });
      })
      .catch(err => {
        toast.error("Something went wrong.");
      });
  };

  const renderAppointmentStatus = (appointmentStatus: number) => {
    switch(appointmentStatus) {
    case AppointmentStatus.Pending: return "PENDING";
    case AppointmentStatus.Missed: return "MISSED";
    case AppointmentStatus.Done: return "DONE";
    case AppointmentStatus.Cancelled: return "CANCELLED";
    default: return undefined;
    }
  };

  return <Container maxWidth="lg" sx={{marginTop: "10rem"}}>
    <Dialog
      open={appointmentBookingDialogOpen}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="responsive-dialog-title"
        sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
        <Typography variant='h4'>Book an appointment</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleAppointmentDialogClose}
          aria-label="close"
          sx={{justifySelf: "end"}}
        >
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{height: "100%"}}>
        <CreateAppointmentForm setDialog={appointmentBookingDialogOpen} transfusionCenters={transfusionCenters} donorId={userInfo?.id || ""} onSubmit={handleAppointmentBook}/>
      </DialogContent>
    </Dialog>
    {loading ? <CircularProgress sx={{margin: "10rem auto"}}/>
      :
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12} md={4} lg={4}>
         :
          <>
            <EditDonorForm onSubmit={handleDonorUpdate} donor={donor}/>
            <Button variant="contained" onClick={handleRemoveAccount} color="error" sx={{width: "100%", marginTop: "1rem", marginLeft: "1rem"}}>Remove account</Button>
          </>

        </Grid>
        <Grid container item xs={12} md={8} lg={8} alignItems="flex-start">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, maxHeight: 500 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Transfusion center</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Doctor</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell><Button variant="contained" onClick={handleAppointmentDialogOpen}>Book an appointment</Button></TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((row: Appointment) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.transfusionCenter}</TableCell>
                    <TableCell align="left">{new Date(row.date).toDateString()}</TableCell>
                    <TableCell align="left">{row.doctor}</TableCell>
                    <TableCell align="left">{renderAppointmentStatus(row.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={handleAppointmentCancel(row.id)}
                        disabled={dayjs(row.date).isBefore(dayjs(), "day") || row.status !== AppointmentStatus.Pending}>Cancel appointment</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    }
  </Container>;
};

export default DonorDashboard;