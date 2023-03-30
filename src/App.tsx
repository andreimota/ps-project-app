import React, {ReactNode} from "react";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import {Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import {CssBaseline} from "@mui/material";
import DonorDashboard from "./pages/dashboard/DonorDashboard";
import NavBar from "./components/NavBar";
import RegisterPage from "./pages/login/RegisterPage";
import {AccountType} from "./router/useAuth";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";


function App() {
  const defaultContainer = (): ReactNode => (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <Navigate to={"/login"} />
        } />
        <Route key="login" path="/login" element={<LoginPage />} />
        <Route key="register" path="/register" element={<RegisterPage />} />
        <Route path='/donor-dashboard' element={
          <ProtectedRoute requiredRole={AccountType.DONOR}>
            <DonorDashboard />
          </ProtectedRoute>}/>
        <Route path="/admin-dashboard" element={
          <ProtectedRoute requiredRole={AccountType.ADMIN}>
            <AdminDashboard />
          </ProtectedRoute>
        }/>
        <Route path="/doctor-dashboard" element={
          <ProtectedRoute requiredRole={AccountType.DOCTOR}>
            <DoctorDashboard/>
          </ProtectedRoute>
        }/>
      </Routes>
    </>
  );

  return (
    <div className="App">
      <CssBaseline />
      <ToastContainer />
      {defaultContainer()}
    </div>
  );
}

export default App;
