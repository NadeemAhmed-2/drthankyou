// import React, { useEffect, useState } from "react";
// import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   collection,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "./Profile.css"; // Import the CSS for Profile
// import Navbar from "../Navbar";
// import Footer from "../Footer/Footer";

// const Profile = () => {
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//   });
//   const [appointmentsCount, setAppointmentsCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false); // Track edit mode
//   const [updatedInfo, setUpdatedInfo] = useState({
//     name: "",
//     phoneNumber: "",
//     address: "",
//   });

//   const auth = getAuth();
//   const db = getFirestore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         const fetchUserData = async () => {
//           try {
//             const userDocRef = doc(db, "users", user.uid);
//             const userDocSnap = await getDoc(userDocRef);

//             if (userDocSnap.exists()) {
//               const userData = userDocSnap.data();
//               setUserInfo({
//                 name: userData.name || user.displayName || "No Name",
//                 email: user.email,
//                 phoneNumber: userData.phoneNumber || "No Phone Number",
//                 address: userData.address || "No Address",
//               });
//               setUpdatedInfo({
//                 name: userData.name || user.displayName || "No Name",
//                 phoneNumber: userData.phoneNumber || "No Phone Number",
//                 address: userData.address || "No Address",
//               });
//             } else {
//               setUserInfo({
//                 name: user.displayName || "No Name",
//                 email: user.email,
//                 phoneNumber: "No Phone Number",
//                 address: "No Address",
//               });
//               setUpdatedInfo({
//                 name: user.displayName || "No Name",
//                 phoneNumber: "No Phone Number",
//                 address: "No Address",
//               });
//             }

//             // Fetch appointments count
//             const appointmentsRef = collection(db, "appointments");
//             const q = query(appointmentsRef, where("patientId", "==", user.uid));
//             const querySnapshot = await getDocs(q);
//             setAppointmentsCount(querySnapshot.size);
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//           }
//         };

//         fetchUserData();
//       } else {
//         navigate("/login");
//       }

//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, [auth, db, navigate]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true); // Enable editing mode
//   };

//   const handleSave = async () => {
//     try {
//       const user = getAuth().currentUser;
//       if (user) {
//         const userDocRef = doc(db, "users", user.uid);
//         await setDoc(
//           userDocRef,
//           {
//             name: updatedInfo.name,
//             phoneNumber: updatedInfo.phoneNumber,
//             address: updatedInfo.address,
//           },
//           { merge: true }
//         ); // Update the document with new data

//         // Reflect the changes in the state
//         setUserInfo({
//           ...userInfo,
//           name: updatedInfo.name,
//           phoneNumber: updatedInfo.phoneNumber,
//           address: updatedInfo.address,
//         });

//         setIsEditing(false); // Disable editing mode after saving
//       }
//     } catch (error) {
//       console.error("Error updating user data:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="profile-container">
//         <div className="profile-card">
//           <div className="profile-header">
//             <h2>Profile</h2>
//           </div>
//           <div className="profile-info">
//             <div className="profile-details">
//               <p>
//                 <strong>Name:</strong>{" "}
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="name"
//                     value={updatedInfo.name}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   userInfo.name
//                 )}
//               </p>
//               <p>
//                 <strong>Email:</strong> {userInfo.email}
//               </p>
//               <p>
//                 <strong>Phone Number:</strong>{" "}
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={updatedInfo.phoneNumber}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   userInfo.phoneNumber
//                 )}
//               </p>
//               <p>
//                 <strong>Address:</strong>{" "}
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     name="address"
//                     value={updatedInfo.address}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   userInfo.address
//                 )}
//               </p>
//               <p>
//                 <strong>Appointments:</strong> {appointmentsCount}
//               </p>
//             </div>
//             <div className="edit-save-container">
//               {!isEditing ? (
//                 <button onClick={handleEdit} className="edit-button">
//                   Edit
//                 </button>
//               ) : (
//                 <button onClick={handleSave} className="save-button">
//                   Save
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "./Profile.css";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    phoneNumber: "",
    address: "",
  });

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const fetchUserData = async () => {
          try {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setUserInfo({
                name: userData.name || user.displayName || "No Name",
                email: user.email,
                phoneNumber: userData.phoneNumber || "No Phone Number",
                address: userData.address || "No Address",
              });
              setUpdatedInfo({
                name: userData.name || user.displayName || "No Name",
                phoneNumber: userData.phoneNumber || "No Phone Number",
                address: userData.address || "No Address",
              });
            } else {
              setUserInfo({
                name: user.displayName || "No Name",
                email: user.email,
                phoneNumber: "No Phone Number",
                address: "No Address",
              });
              setUpdatedInfo({
                name: user.displayName || "No Name",
                phoneNumber: "No Phone Number",
                address: "No Address",
              });
            }

            // Fetch appointments count
            const appointmentsRef = collection(db, "appointments");
            const q = query(
              appointmentsRef,
              where("patientId", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            setAppointmentsCount(querySnapshot.size);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };

        fetchUserData();
      } else {
        navigate("/login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
     // alert("Profile updated successfully!"); 
      const user = getAuth().currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(
          userDocRef,
          {
            name: updatedInfo.name,
            phoneNumber: updatedInfo.phoneNumber,
            address: updatedInfo.address,
          },
          { merge: true }
        );
       
          toast.success("Profile updated successfully!",{
            style: {
              color: 'white',  // Change this to any color you prefer
            },
          
          }); 
    
       // toast.success("Profile updated successfully!"); 

        // Reflect the changes in the state
        setUserInfo({
          ...userInfo,
          name: updatedInfo.name,
          phoneNumber: updatedInfo.phoneNumber,
          address: updatedInfo.address,
        });
        // alert("Profile updated successfully!"); 
        setIsEditing(false);
        console.log("profile updated")
       // toast.sucess("Profile updated successfully!"); // Toast message
      }
    } catch (error) {
      toast.error("Failed to Update, retry again!");
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Profile</h2>
          </div>
          <div className="profile-info">
            <div className="profile-details">
              <p>
                <strong>Name:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={updatedInfo.name}
                    onChange={handleChange}
                  />
                ) : (
                  userInfo.name
                )}
              </p>
              <p>
                <strong>Email:</strong> {userInfo.email}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={updatedInfo.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  userInfo.phoneNumber
                )}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={updatedInfo.address}
                    onChange={handleChange}
                  />
                ) : (
                  userInfo.address
                )}
              </p>
              <p>
                <strong>Appointments:</strong> {appointmentsCount}
              </p>
            </div>
            <div className="edit-save-container">
              {!isEditing ? (
                <button onClick={handleEdit} className="edit-button">
                  Edit
                </button>
              ) : (
                <button onClick={handleSave} className="save-button">
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} /> {/* Add Toast Container */}
    </>
  );
};

export default Profile;
