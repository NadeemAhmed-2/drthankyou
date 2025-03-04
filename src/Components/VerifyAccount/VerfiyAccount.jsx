import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Import Firebase Firestore reference
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./VerifyAccount.css"
const VerifyAccount = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    batch: "",
    collegeId: "",
    collegeName: "",
    percentage: "",
    address: "",
    profileImage: "",
    idCardImage: "",
  });

  const [uploading, setUploading] = useState(false);

  // Fetch existing user data when the component mounts
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "doctors", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setFormData((prevData) => ({ ...prevData, ...userDoc.data() }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file change (Profile Image & ID Card Image)
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({ ...prevData, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission to Firestore
  // const handleUpload = async () => {
  //   if (!user) return;

  //   if (
  //     !formData.name ||
  //     !formData.phone ||
  //     !formData.email ||
  //     !formData.dob ||
  //     !formData.batch ||
  //     !formData.collegeId ||
  //     !formData.collegeName ||
  //     !formData.percentage ||
  //     !formData.address ||
  //     !formData.profileImage ||
  //     !formData.idCardImage
  //   ) {
  //     alert("Please provide all details");
  //     return;
  //   }

  //   setUploading(true);

  //   try {
  //     const userRef = doc(db, "doctors", user.uid);

  //     await setDoc(userRef, formData, { merge: true }); // Merge to prevent data loss

  //     alert("User details uploaded successfully");
  //   } catch (error) {
  //     console.error("Error saving user data:", error);
  //   }

  //   setUploading(false);
  // };
  const handleUpload = async () => {
    if (!user) return;
  
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.dob ||
      !formData.batch ||
      !formData.collegeId ||
      !formData.collegeName ||
      !formData.percentage ||
      !formData.address ||
      !formData.profileImage ||
      !formData.idCardImage
    ) {
      alert("Please provide all details");
      return;
    }
  
    setUploading(true);
  
    try {
      const userRef = doc(db, "doctors", user.uid);
  
      // Upload user details to Firestore, merging data to prevent overwriting
      await setDoc(userRef, formData, { merge: true });
  
      alert("User details uploaded successfully. You will receive a message regarding your verified status in your profile section.");
  
      // Optionally, you could set a "verified" field in the Firestore document to "false" initially
      const doctorRef = doc(db, "doctors", user.uid);
      await setDoc(doctorRef, { verified: false }, { merge: true });
  
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  
    setUploading(false);
  };
  

  return (
    <div className="user-upload-form">
      <h2>Upload User Details</h2>

      <label>Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />

      <label>Phone</label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Enter your phone number"
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter your email"
      />

      <label>Date of Birth</label>
      <input
        type="date"
        name="dob"
        value={formData.dob}
        onChange={handleInputChange}
      />

      <label>Batch</label>
      <input
        type="text"
        name="batch"
        value={formData.batch}
        onChange={handleInputChange}
        placeholder="Enter your batch"
      />

      <label>College ID</label>
      <input
        type="text"
        name="collegeId"
        value={formData.collegeId}
        onChange={handleInputChange}
        placeholder="Enter your College ID"
      />

      <label>College Name</label>
      <input
        type="text"
        name="collegeName"
        value={formData.collegeName}
        onChange={handleInputChange}
        placeholder="Enter your College Name"
      />

      <label>Percentage</label>
      <input
        type="text"
        name="percentage"
        value={formData.percentage}
        onChange={handleInputChange}
        placeholder="Enter your percentage"
      />

      <label>Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Enter your address"
      />

      <label>Upload Profile Image</label>
      <input
        type="file"
        onChange={(e) => handleImageChange(e, "profileImage")}
      />

      <label>Upload ID Card Image</label>
      <input
        type="file"
        onChange={(e) => handleImageChange(e, "idCardImage")}
      />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {formData.profileImage && (
        <div>
          <h3>Profile Image:</h3>
          <img
            src={formData.profileImage}
            alt="Profile"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}

      {formData.idCardImage && (
        <div>
          <h3>ID Card Image:</h3>
          <img
            src={formData.idCardImage}
            alt="ID Card"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
    </div>
  );
};

export default VerifyAccount;
