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
  const [appointments, setAppointments] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const userInfo = useAuth();

  useEffect(() => {
    api.get(`/appointment/doctor/${userInfo?.id}`)
      .then(res => {
        setAppointments(res);
      })
      .catch(err => {
        console.error(err.message);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAppointmentStatus = (id: string, status: number) => () => {
    api.put(`/appointment/${id}/${status}`)
      .then(res => {
        toast.success("Appointment updated successfully.");

        api.get(`/appointment/doctor/${userInfo?.id}`)
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
    {loading ? <CircularProgress sx={{margin: "10rem auto"}}/>
      :
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, maxHeight: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Transfusion center</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Doctor</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row: Appointment) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.transfusionCenter}</TableCell>
                <TableCell align="left">{new Date(row.date).toDateString()}</TableCell>
                <TableCell align="left">{row.donor}</TableCell>
                <TableCell align="left">{renderAppointmentStatus(row.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={handleAppointmentStatus(row.id, AppointmentStatus.Done)}
                    disabled={row.status !== AppointmentStatus.Pending}>Mark as done</Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={handleAppointmentStatus(row.id, AppointmentStatus.Missed)}
                    disabled={row.status !== AppointmentStatus.Pending}>Mark as missed</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
  </Container>;
};

export default DonorDashboard;