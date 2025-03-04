import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import Navbar from "../../Components/Navbar";
import d1 from "../../assets/d1.png";
import d2 from "../../assets/d2.png";
import d81 from "../../assets/d8.jpg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import "./DoctorProfile.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Doctorprofile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [uid, setUid] = useState();

  const getDoctorImage = (id) => {
    switch (id) {
      case 1:
        return d1;
      case 2:
        return d2;
      case 3:
        return d81;
      default:
        return d1;
    }
  };

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      const docRef = doc(db, "doctors", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDoctor(docSnap.data());
      } else {
        console.log("No such doctor!");
      }
    };

    fetchDoctor();
  }, [id]);

  // Fetch user details when logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);

        const userDocRef = doc(db, "users", uid);
        const userDocSnap = getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
        } else {
          console.log("No user data found!");
        }
      }
    });

    return () => unsubscribe();
  }, [uid]);

  // Handle booking appointment
  const handleBookAppointment = async () => {
    if (!selectedDate) {
      alert("Please select a date for the appointment.");
      return;
    }

    if (uid) {
      try {
        const appointmentRef = collection(db, "appointments");

        await addDoc(appointmentRef, {
          doctorId: id,
          patientId: uid,
          DoctorName: doctor.name,
          patientName: localStorage.getItem("name"),
          appointmentDate: selectedDate,
          status: "Pending",
        });

        toast.success("Appointment successfully booked!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,

          draggable: true,
          style: {
            color: "white", // Change this to any color you prefer
          },

          progress: undefined,
        });
      } catch (error) {
        console.error("Error booking appointment: ", error);
        alert("There was an error booking your appointment. Please try again.");
      }
    } else {
      alert("You must be logged in to book an appointment.");
    }
  };

  if (!doctor) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="doctor-profile-container">
        {/* Doctor Profile and Booking Section */}
        <div className="profile-booking-container">
          <div className="doctor-profile">
            <img
              src={doctor.profileImage || getDoctorImage(id)}
              alt={doctor.name}
              className="doctor-image"
            />
            <h2>
              {doctor.name} <span className="verified">✔</span>
            </h2>
            <p>
              {doctor.fieldOfStudy} | MBBS {doctor.year} year
            </p>
            <p>
              <strong>Appointment fee:</strong> $50
            </p>
            <p className="about">
              Dr. {doctor.name} is committed to providing excellent medical
              care.
            </p>
          </div>

          {/* Booking Section */}
          <div className="booking-section">
            <h3>Book an Appointment</h3>

            <div className="input-group">
              <label>Select Date</label>
              <input
                type="date"
                className="date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <button className="book-button" onClick={handleBookAppointment}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <ToastContainer style={{ color: "white" }} />
    </>
  );
};

export default Doctorprofile;
