import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HeroComponent from "../../Components/HeroComponent";
import Footer from "../../Components/Footer/Footer";
import Doctors from "../Doctors/Doctors";
import Speciality from "../../Components/Speciality/Speciality";
import { db, auth } from "../../firebase"; // Assuming Firebase is set up
import { doc, getDoc } from "firebase/firestore";
import AiQueryComponent from "../../Components/ChatBot/AiQueryComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [flag, setFlag] = useState(true);
  const [fla, setFla] = useState(false);
  const [isVerified, setIsVerified] = useState(true); // Default true (won't show button)
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
    }
  });

  useEffect(() => {
    const fetchDoctorVerificationStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const doctorRef = doc(db, "doctors", user.uid);
        const doctorSnap = await getDoc(doctorRef);
        if (doctorSnap.exists()) {
          setIsVerified(doctorSnap.data().verified); // Set verification status from Firestore
        }
      }
    };

    fetchDoctorVerificationStatus();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) navigate("/login");
  }, []);
  return (
    <div>
      <Navbar />
      <br />
      <br />
      <HeroComponent flag={flag} />

      {/* Show "Get Verified" button only if the doctor is NOT verified */}
      {!isVerified && (
        <div style={{ textAlign: "center", marginTop: "38px"}}>
          <button
            onClick={() => navigate("/verify-account")}
            style={{
              backgroundColor: "#ff6600",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Get Verified
          </button>
        </div>
      )}
      <AiQueryComponent />
      <Speciality />
      <Doctors />
      <HeroComponent flag={fla} />
      {!user && (
        <button
          className="btn1"
          style={{
            position: "absolute",
            borderRadius: "20px",
            left: "15%",
            top: "560vh",
            border: "2px solid white",
          }}
        >
          <Link
            to="/doctor-signup"
            style={{ textDecoration: "none", color: "black" }}
          >
            Create account?
          </Link>
        </button>
      )}
      <br/>
      <br/>
      <Footer />
    </div>
  );
};

export default Home;
