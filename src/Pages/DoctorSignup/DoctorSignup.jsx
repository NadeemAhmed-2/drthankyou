

import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./DoctorSignup.css"
const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // role: "doctor",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Firebase Authentication: Create Doctor Account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Firestore: Save Doctor Info
      await setDoc(doc(db, "doctors", user.uid), {
        name: formData.name,
        email: formData.email,
        role: "doctor",
        verified : false,
      });

      alert("Doctor registered successfully!");
      navigate("/"); // Redirect to Doctor Profile Page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container doctor">
      <h2>Doctor Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="doc-btn" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default DoctorSignup;
