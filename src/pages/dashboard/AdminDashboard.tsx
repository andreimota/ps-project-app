import React, {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Container, Dialog, DialogContent, DialogTitle,
  Grid, IconButton, Menu, MenuItem, Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import EditDonorForm from "../../components/forms/EditDonorForm";
import useAuth from "../../router/useAuth";
import {Donor} from "../../types/Donor";
import api from "../../api/api";
import {toast} from "react-toastify";
import {Doctor} from "../../types/Doctor";
import {Close} from "@mui/icons-material";
import CreateDoctorForm from "../../components/forms/CreateDoctorForm";
import EditDoctorForm from "../../components/forms/UpdateDoctorForm";
import {TransfusionCenter} from "../../types/TransfusionCenter";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [transfusionCenters, setTransfusionCenters] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentActionRow, setCurrentActionRow] = useState<any>({});
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState<boolean>(false);
  const [isCreateDoctorDialogOpen, setIsCreateDoctorDialogOpen] = useState(false);
  const [isUpdateDoctorDialogOpen, setIsUpdateDoctorDialogOpen] = useState(false);

  useEffect(() => {
    api.get("/doctor")
      .then(res => {
        setDoctors(res);
      })
      .catch(err => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });

    api.get("/transfusionCenter")
      .then(res => {
        setTransfusionCenters(res.map((tc: TransfusionCenter) => ({
          value: tc.id,
          label: tc.name
        })));
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);

  const handleActionsMenuClick = (event: any, row: any) => {
    setIsActionsMenuOpen(true);
    setCurrentActionRow(row);
    setAnchorEl(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setIsActionsMenuOpen(false);
    setAnchorEl(null);
    setCurrentActionRow(null);
  };

  const handleCreateDoctorDialogClose = () => {
    setIsCreateDoctorDialogOpen(false);
  };

  const handleUpdateDoctorDialogClose = () => {
    setIsUpdateDoctorDialogOpen(false);
  };

  const handleDoctorCreate = (data: FieldValues) => {
    api.post("/doctor", data)
      .then(res => {
        toast.success("Doctor created successfully.");
        setIsCreateDoctorDialogOpen(false);

        api.get("/doctor").then(res => {
          setDoctors(res);
        }).catch(err => {
          toast.error(err.message);
        });
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleDoctorUpdate = (data: FieldValues) => {
    api.put("/doctor", data)
      .then(res => {
        toast.success("Doctor updated successfully.");
        setIsUpdateDoctorDialogOpen(false);

        api.get("/doctor").then(res => {
          setDoctors(res);
        }).catch(err => {
          toast.error(err.message);
        });
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleDoctorRemove = () => {
    api.remove(`/doctor/${currentActionRow.id}`)
      .then(res => {
        toast.success("Doctor removed successfully.");

        api.get("/doctor").then(res => {
          setDoctors(res);
        }).catch(err => {
          toast.error(err.message);
        });
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  return <Container maxWidth="lg" sx={{marginTop: "10rem"}}>
    <Dialog
      open={isCreateDoctorDialogOpen}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="responsive-dialog-title"
        sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
        <Typography variant='h4'>Register a doctor</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleCreateDoctorDialogClose}
          aria-label="close"
          sx={{justifySelf: "end"}}
        >
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{height: "100%"}}>
        <CreateDoctorForm onSubmit={handleDoctorCreate} transfusionCenters={transfusionCenters}/>
      </DialogContent>
    </Dialog>
    <Dialog
      open={isUpdateDoctorDialogOpen}
      onClose={() => { setIsUpdateDoctorDialogOpen(false);}}
      aria-labelledby="responsive-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="responsive-dialog-title"
        sx={{width: "100%", display: "flex", justifyContent: "space-between"}}>
        <Typography variant='h4'>Update doctor</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleUpdateDoctorDialogClose}
          aria-label="close"
          sx={{justifySelf: "end"}}
        >
          <Close/>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{height: "100%"}}>
        <EditDoctorForm onSubmit={handleDoctorUpdate} doctor={currentActionRow as Doctor} transfusionCenters={transfusionCenters}/>
      </DialogContent>
    </Dialog>
    {loading ? <CircularProgress />
      :
      <Grid container direction="column">
        <Grid container item justifyContent="flex-end">
          <Grid item><Button
            variant="contained"
            onClick={()=>{
              setIsCreateDoctorDialogOpen(true);
            }}>Add a doctor</Button></Grid>
        </Grid>
        <Grid item sx={{marginTop: "1rem"}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">GUID</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">SSN</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.map((row: Doctor) => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.ssn}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell>
                      <Button
                        id="basic-button"
                        aria-controls={isActionsMenuOpen ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={isActionsMenuOpen ? "true" : undefined}
                        onClick={(event) => handleActionsMenuClick(event, row)}
                      >
                              Actions
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={isActionsMenuOpen}
                        onClose={handleActionsMenuClose}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <Box>
                          <MenuItem onClick={() => {
                            setIsActionsMenuOpen(false);
                            setIsUpdateDoctorDialogOpen(true);
                          }}>Update</MenuItem>
                          <MenuItem onClick={() => {
                            setIsActionsMenuOpen(false);
                            handleDoctorRemove();
                          }}>Remove</MenuItem>
                        </Box>
                      </Menu>
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

export default AdminDashboard;