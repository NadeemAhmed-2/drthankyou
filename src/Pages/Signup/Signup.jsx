

import React, { useState } from "react";
import { registerUser } from "../../firebase"; // Assuming this handles Firebase Authentication
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../firebase";// Import Firestore instance from Firebase config
import { setDoc, doc } from "firebase/firestore"; // Firestore functions
import "./Signup.css" // Import the same CSS file



const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Register the user with Firebase Authentication
      const userCredential = await registerUser(email, password);

      // Step 2: Get the user ID (UID) from Firebase Authentication
      const userId = userCredential.user.uid;

      // Step 3: Store user data in Firestore
      await setDoc(doc(db, "users", userId), {
        name: name,
        email: email,
        verified : false,
        phoneNumber: phoneNumber, // Store phone number
      });
      localStorage.setItem("name",name)

      // Step 4: Navigate to the homepage after successful signup
      navigate("/");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // <div className="container">
    //   <h2 className="title">Signup</h2>
    //   {error && <p className="error">{error}</p>}
    //   <form onSubmit={handleSignup} className="form">
    //     <input
    //       type="text"
    //       placeholder="Name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       required
    //       className="input"
    //     />
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //       className="input"
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //       className="input"
    //     />
    //     <input
    //       type="text"
    //       placeholder="Phone Number"
    //       value={phoneNumber}
    //       onChange={(e) => setPhoneNumber(e.target.value)}
    //       required
    //       className="input"
    //     />
    //     <button type="submit" className="button">
    //       Signup
    //     </button>
    //   </form>
    //   <p style={{ marginTop: "10px" }}>
    //     Already have an account? <Link to="/login">Login</Link>
    //   </p>
    // </div>
    <div className="signup-container">
    <div className="signup-box">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          required
        />
        <button className="signup-btn" type="submit">
          Signup
        </button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/Login">Login</Link>
      </p>
      
    </div>
    {/* alert notifications */}
    <alertContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
  );
};
export default Signup;
