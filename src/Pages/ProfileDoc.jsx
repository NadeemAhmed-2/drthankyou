// import React, { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import Navbar from "../Components/Navbar";
// import "./ProfileDoc.css";

// const ProfileDoc = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [imageBase64, setImageBase64] = useState(""); // Store image in base64 format
//   const [image, setImage] = useState(null); // Store image file object

//   useEffect(() => {
//     const fetchDoctorData = async () => {
//       setLoading(true); // Set loading to true when fetching data
//       const auth = getAuth();
//       const user = auth.currentUser; // Get current authenticated user

//       if (user) {
//         try {
//           const docRef = doc(db, "doctors", user.uid); // Get doctor data from Firestore
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             setDoctor(docSnap.data());
//             setFormData(docSnap.data());
//             setImageBase64(docSnap.data().profileImage || ""); // Set the doctor's profile image if exists
//           } else {
//             console.error("Doctor not found in Firestore");
//           }
//         } catch (error) {
//           console.error("Error fetching doctor data:", error);
//         }
//       } else {
//         console.error("User is not authenticated");
//       }
//       setLoading(false); // Set loading to false after data is fetched
//     };

//     fetchDoctorData();
//   }, []); // Empty dependency array to fetch data on component mount

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageBase64(reader.result); // Convert image to base64
//       };
//       reader.readAsDataURL(file); // Read the file as a data URL (base64)
//       setImage(file); // Save the file for uploading later
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       if (user) {
//         const docRef = doc(db, "doctors", user.uid);
//         await updateDoc(docRef, {
//           ...formData,
//           profileImage: imageBase64 || doctor.profileImage, // Save new image if available
//         });
//         setDoctor({ ...formData, profileImage: imageBase64 });

//         alert("Profile updated successfully!");
//         setEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   // Loading state, wait for the data before rendering content
//   if (loading) {
//     return <div className="loading-state">Loading...</div>; // Add a class for loading styles
//   }

//   // Show error message if doctor data is missing
//   if (!doctor) {
//     return (
//       <div className="error-state">
//         Doctor profile not found. Please log in.
//       </div>
//     );
//   }

//   // Display "Verified" or "Pending" based on the verified field
//   const verificationStatus = doctor.verified ? "Verified" : "Pending";

//   return (
//     <>
//       <Navbar />
//       <div className={`doctor-profile ${editing ? "edit" : ""}`}>
//         <h2>Doctor Profile</h2>
//         <div className="doctor-image-container">
//           <img
//             src={imageBase64 || "default_image_path"} // Show base64 image or default placeholder
//             alt="Doctor Profile"
//             style={{ width: "200px", height: "200px" }}
//             className="doctor-image si"
//           />
//         </div>
//         <p>
//           <strong>Name:</strong>{" "}
//           {editing ? (
//             <input name="name" value={formData.name} onChange={handleChange} />
//           ) : (
//             doctor.name
//           )}
//         </p>
//         <p>
//           <strong>Email:</strong> {doctor.email}
//         </p>
//         <p>
//           <strong>Address:</strong>{" "}
//           {editing ? (
//             <input
//               name="address"
//               value={formData.address || ""}
//               onChange={handleChange}
//             />
//           ) : (
//             doctor.address || "Not provided"
//           )}
//         </p>
//         <p>
//           <strong>Qualification:</strong>{" "}
//           {editing ? (
//             <input
//               name="qualification"
//               value={formData.qualification || ""}
//               onChange={handleChange}
//             />
//           ) : (
//             doctor.qualification || "Not provided"
//           )}
//         </p>
//         <p>
//           <strong>Field of Study:</strong>{" "}
//           {editing ? (
//             <input
//               name="fieldOfStudy"
//               value={formData.fieldOfStudy || ""}
//               onChange={handleChange}
//             />
//           ) : (
//             doctor.fieldOfStudy || "Not provided"
//           )}
//         </p>
//         <p>
//           <strong>Description:</strong>{" "}
//           {editing ? (
//             <textarea
//               name="description"
//               value={formData.description || ""}
//               onChange={handleChange}
//             />
//           ) : (
//             doctor.description || "Not provided"
//           )}
//         </p>
//         <p>
//           <strong>Phone:</strong>{" "}
//           {editing ? (
//             <input
//               name="phone"
//               value={formData.phone || ""}
//               onChange={handleChange}
//             />
//           ) : (
//             doctor.phone || "Not provided"
//           )}
//         </p>

//         {/* Displaying the verification status */}
//         <p>
//           <strong>Verification Status:</strong> {verificationStatus}
//         </p>

//         {editing ? (
//           <>
//             <div>
//               <strong>Profile Image:</strong>{" "}
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 accept="image/*"
//               />
//               {imageBase64 && (
//                 <div>
//                   <h4>Uploaded Image:</h4>
//                   <img
//                     src={imageBase64}
//                     alt="Uploaded"
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       borderRadius: "50%",
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//             <button className="btn-save pbtn" onClick={handleSave}>
//               Save Changes
//             </button>
//           </>
//         ) : (
//           <button className="btn-edit pbtn" onClick={handleEdit}>
//             Edit Profile
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default ProfileDoc;


import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfileDoc.css";

const ProfileDoc = () => {
  const [doctor, setDoctor] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true); // Track loading state
  const [imageBase64, setImageBase64] = useState(""); // Store image in base64 format
  const [image, setImage] = useState(null); // Store image file object

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true); // Set loading to true when fetching data
      const auth = getAuth();
      const user = auth.currentUser; // Get current authenticated user

      if (user) {
        try {
          const docRef = doc(db, "doctors", user.uid); // Get doctor data from Firestore
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setDoctor(docSnap.data());
            setFormData(docSnap.data());
            setImageBase64(docSnap.data().profileImage || ""); // Set the doctor's profile image if exists
          } else {
            console.error("Doctor not found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      } else {
        console.error("User is not authenticated");
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchDoctorData();
  }, []); // Empty dependency array to fetch data on component mount

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Convert image to base64
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64)
      setImage(file); // Save the file for uploading later
    }
  };

  const handleSave = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "doctors", user.uid);
        await updateDoc(docRef, {
          ...formData,
          profileImage: imageBase64 || doctor.profileImage, // Save new image if available
        });
        setDoctor({ ...formData, profileImage: imageBase64 });

        toast.success("Profile updated successfully!",{
          style: {
            color: 'white',  // Change this to any color you prefer
          },
        
        }); // Success toast
        setEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile! Please try again."); // Error toast
    }
  };

  // Loading state, wait for the data before rendering content
  if (loading) {
    return <div className="loading-state">Loading...</div>; // Add a class for loading styles
  }

  // Show error message if doctor data is missing
  if (!doctor) {
    return (
      <div className="error-state">
        Doctor profile not found. Please log in.
      </div>
    );
  }

  // Display "Verified" or "Pending" based on the verified field
  const verificationStatus = doctor.verified ? "Verified" : "Pending";

  return (
    <>
      <Navbar />
      <div className={`doctor-profile d-p2 ${editing ? "edit" : ""}`}>
        <h2>Doctor Profile</h2>
        <div className="doctor-image-container">
          <img
            src={imageBase64 || "default_image_path"} // Show base64 image or default placeholder
            alt="Doctor Profile"
            style={{ width: "200px", height: "200px" }}
            className="doctor-image si"
          />
        </div>
        <p>
          <strong>Name:</strong>{" "}
          {editing ? (
            <input name="name" value={formData.name} onChange={handleChange} />
          ) : (
            doctor.name
          )}
        </p>
        <p>
          <strong>Email:</strong> {doctor.email}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {editing ? (
            <input
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
            />
          ) : (
            doctor.address || "Not provided"
          )}
        </p>
        <p>
          <strong>Qualification:</strong>{" "}
          {editing ? (
            <input
              name="qualification"
              value={formData.qualification || ""}
              onChange={handleChange}
            />
          ) : (
            doctor.qualification || "Not provided"
          )}
        </p>
        <p>
          <strong>Field of Study:</strong>{" "}
          {editing ? (
            <input
              name="fieldOfStudy"
              value={formData.fieldOfStudy || ""}
              onChange={handleChange}
            />
          ) : (
            doctor.fieldOfStudy || "Not provided"
          )}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {editing ? (
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          ) : (
            doctor.description || "Not provided"
          )}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          {editing ? (
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          ) : (
            doctor.phone || "Not provided"
          )}
        </p>

        {/* Displaying the verification status */}
        <p>
          <strong>Verification Status:</strong> {verificationStatus}
        </p>

        {editing ? (
          <>
            <div>
              <strong>Profile Image:</strong>{" "}
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              {imageBase64 && (
                <div>
                  <h4>Uploaded Image:</h4>
                  <img
                    src={imageBase64}
                    alt="Uploaded"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
            </div>
            <button className="btn-save pbtn" onClick={handleSave}>
              Save Changes
            </button>
          </>
        ) : (
          <button className="btn-edit pbtn" onClick={handleEdit}>
            Edit Profile
          </button>
        )}
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default ProfileDoc;
