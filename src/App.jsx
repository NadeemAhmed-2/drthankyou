import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Doctors from "./Pages/Doctors/Doctors";

import Navbar from "./Components/Navbar";
import "./App.css";
import AllDoctors from "./Components/AllDoctors/AllDoctors";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Doctorprofile from "./Pages/DoctorProfile/DoctorProfile";
import Profile from "./Components/Profile/Profile";
import DoctorSignup from "./Pages/DoctorSignup/DoctorSignup";
import ProfileDoc from "./Pages/ProfileDoc";
import VideoCall from "./Components/VideoCall";
import DoctorDashBoard from "./Components/DoctorDashBoard/DoctorDashBoard";
import Appointments from "./Components/Appointments/Appointments";
import VerifyAccount from "./Components/VerifyAccount/VerfiyAccount";
import AdminPanel from "./Components/AdminPannel/AdminPannel";
import { auth } from "./firebase";
import MedicalForm from "./Components/SeverityCheckModel/SeverityModel";
function App() {
  // const ProtectedRoute = ({ element }) => {
  //   const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //       setUser(authUser);
  //       setLoading(false);
  //     });
  //     return () => unsubscribe();
  //   }, []);
  // }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/medicalform" element={<MedicalForm />}></Route>
        <Route path="/adminpannel" element={<AdminPanel />}></Route>
        <Route path="/verify-account" element={<VerifyAccount />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/videocall" element={<VideoCall />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="profiledoctor" element={<ProfileDoc />}></Route>
        <Route path="/doctor-signup" element={<DoctorSignup />}></Route>
        <Route path="/alldoctors" element={<AllDoctors />}></Route>
        <Route path="/myappointments" element={<Appointments />}></Route>
        <Route path="/doctorprofile/:id" element={<Doctorprofile />}></Route>
        <Route path="/doctordashboard" element={<DoctorDashBoard />}></Route>
        {/* <Route path="/doctor/:id" element={<DoctorProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
