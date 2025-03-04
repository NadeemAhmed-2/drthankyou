// import React, { useEffect, useState } from "react";
// import { db } from "../../firebase"; // Ensure Firebase is correctly set up
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   doc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";

// const AdminPanel = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedDoctor, setSelectedDoctor] = useState(null); // Stores selected doctor for verification

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const q = query(
//           collection(db, "doctors"),
//           where("verified", "==", false)
//         );
//         const querySnapshot = await getDocs(q);
//         const doctorList = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setDoctors(doctorList);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   // ✅ Verify doctor
//   const verifyDoctor = async (id) => {
//     try {
//       await updateDoc(doc(db, "doctors", id), { verified: true });
//       await updateDoc(doc(db, "doctorVerification", id), { verified: true });

//       setDoctors(doctors.filter((doctor) => doctor.id !== id));
//       alert("Doctor verified successfully!");
//     } catch (error) {
//       console.error("Error verifying doctor:", error);
//       alert("Error verifying doctor. Please try again.");
//     }
//   };

//   // ❌ Reject doctor (Delete from database)
//   const rejectDoctor = async (id) => {
//     if (window.confirm("Are you sure you want to reject this doctor?")) {
//       try {
//         await deleteDoc(doc(db, "doctors", id));
//         await deleteDoc(doc(db, "doctorVerification", id));

//         setDoctors(doctors.filter((doctor) => doctor.id !== id));
//         alert("Doctor rejected successfully!");
//       } catch (error) {
//         console.error("Error rejecting doctor:", error);
//         alert("Error rejecting doctor. Please try again.");
//       }
//     }
//   };

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
//       <h2>Admin Panel - Pending Verifications</h2>
//       {doctors.length === 0 ? (
//         <p>No pending verification requests.</p>
//       ) : (
//         <table
//           border="1"
//           cellPadding="10"
//           style={{
//             width: "100%",
//             textAlign: "left",
//             borderCollapse: "collapse",
//           }}
//         >
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Batch</th>
//               <th>College Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctors.map((doctor) => (
//               <tr key={doctor.id}>
//                 <td>{doctor.name}</td>
//                 <td>{doctor.email}</td>
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.batch}</td>
//                 <td>{doctor.collegeName}</td>
//                 <td>
//                   <button
//                     onClick={() => setSelectedDoctor(doctor)}
//                     style={{
//                       backgroundColor: "blue",
//                       color: "white",
//                       padding: "5px",
//                       border: "none",
//                       cursor: "pointer",
//                       marginRight: "5px",
//                     }}
//                   >
//                     View
//                   </button>
//                   <button
//                     onClick={() => verifyDoctor(doctor.id)}
//                     style={{
//                       backgroundColor: "green",
//                       color: "white",
//                       padding: "5px",
//                       border: "none",
//                       cursor: "pointer",
//                       marginRight: "5px",
//                     }}
//                   >
//                     Verify
//                   </button>
//                   <button
//                     onClick={() => rejectDoctor(doctor.id)}
//                     style={{
//                       backgroundColor: "red",
//                       color: "white",
//                       padding: "5px",
//                       border: "none",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Modal for verification */}
//       {selectedDoctor && (
//         <div
//           style={{
//             position: "fixed",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               padding: "20px",
//               borderRadius: "10px",
//               textAlign: "center",
//               maxWidth: "600px",
//             }}
//           >
//             <h3>Doctor Verification</h3>
//             <p>
//               <strong>Name:</strong> {selectedDoctor.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {selectedDoctor.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {selectedDoctor.phone}
//             </p>
//             <p>
//               <strong>Batch:</strong> {selectedDoctor.batch}
//             </p>
//             <p>
//               <strong>College:</strong> {selectedDoctor.collegeName}
//             </p>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-around",
//                 marginTop: "10px",
//               }}
//             >
//               <div>
//                 <h4>Profile Image</h4>
//                 {selectedDoctor.profileImage ? (
//                   <img
//                     src={selectedDoctor.profileImage}
//                     alt="Profile"
//                     style={{
//                       width: "120px",
//                       height: "120px",
//                       borderRadius: "5px",
//                       cursor: "pointer",
//                     }}
//                     onClick={() =>
//                       window.open(selectedDoctor.profileImage, "_blank")
//                     }
//                   />
//                 ) : (
//                   <p>No Image</p>
//                 )}
//               </div>
//               <div>
//                 <h4>ID Card Image</h4>
//                 {selectedDoctor.idCardImage ? (
//                   <img
//                     src={selectedDoctor.idCardImage}
//                     alt="ID Card"
//                     style={{
//                       width: "120px",
//                       height: "120px",
//                       borderRadius: "5px",
//                       cursor: "pointer",
//                     }}
//                     onClick={() =>
//                       window.open(selectedDoctor.idCardImage, "_blank")
//                     }
//                   />
//                 ) : (
//                   <p>No Image</p>
//                 )}
//               </div>
//             </div>

//             <div style={{ marginTop: "20px" }}>
//               <button
//                 onClick={() => verifyDoctor(selectedDoctor.id)}
//                 style={{
//                   backgroundColor: "green",
//                   color: "white",
//                   padding: "10px",
//                   marginRight: "10px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Verify
//               </button>
//               <button
//                 onClick={() => rejectDoctor(selectedDoctor.id)}
//                 style={{
//                   backgroundColor: "red",
//                   color: "white",
//                   padding: "10px",
//                   marginRight: "10px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Reject
//               </button>
//               <button
//                 onClick={() => setSelectedDoctor(null)}
//                 style={{
//                   backgroundColor: "gray",
//                   color: "white",
//                   padding: "10px",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;


import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Ensure Firebase is correctly set up
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const AdminPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Stores selected doctor for verification
  const [fullImage, setFullImage] = useState(null); // Stores full image to display

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const q = query(
          collection(db, "doctors"),
          where("verified", "==", false)
        );
        const querySnapshot = await getDocs(q);
        const doctorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(doctorList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Verify doctor
  const verifyDoctor = async (id) => {
    try {
      await updateDoc(doc(db, "doctors", id), { verified: true });
      await updateDoc(doc(db, "doctorVerification", id), { verified: true });

      setDoctors(doctors.filter((doctor) => doctor.id !== id));
      alert("Doctor verified successfully!");
    } catch (error) {
      console.error("Error verifying doctor:", error);
      alert("Error verifying doctor. Please try again.");
    }
  };

  // ❌ Reject doctor (Delete from database)
  const rejectDoctor = async (id) => {
    if (window.confirm("Are you sure you want to reject this doctor?")) {
      try {
        await deleteDoc(doc(db, "doctors", id));
        await deleteDoc(doc(db, "doctorVerification", id));

        setDoctors(doctors.filter((doctor) => doctor.id !== id));
        alert("Doctor rejected successfully!");
      } catch (error) {
        console.error("Error rejecting doctor:", error);
        alert("Error rejecting doctor. Please try again.");
      }
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
      <h2>Admin Panel - Pending Verifications</h2>
      {doctors.length === 0 ? (
        <p>No pending verification requests.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Batch</th>
              <th>College Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.batch}</td>
                <td>{doctor.collegeName}</td>
                <td>
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      padding: "5px",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => verifyDoctor(doctor.id)}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      padding: "5px",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => rejectDoctor(doctor.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for verification */}
      {selectedDoctor && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            <h3>Doctor Verification</h3>
            <p>
              <strong>Name:</strong> {selectedDoctor.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedDoctor.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedDoctor.phone}
            </p>
            <p>
              <strong>Batch:</strong> {selectedDoctor.batch}
            </p>
            <p>
              <strong>College:</strong> {selectedDoctor.collegeName}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "10px",
              }}
            >
              <div>
                <h4>Profile Image</h4>
                {selectedDoctor.profileImage ? (
                  <img
                    src={selectedDoctor.profileImage}
                    alt="Profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setFullImage(selectedDoctor.profileImage)}
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
              <div>
                <h4>ID Card Image</h4>
                {selectedDoctor.idCardImage ? (
                  <img
                    src={selectedDoctor.idCardImage}
                    alt="ID Card"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setFullImage(selectedDoctor.idCardImage)}
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button onClick={() => setSelectedDoctor(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Full Image Modal */}
      {fullImage && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setFullImage(null)}
        >
          <img src={fullImage} alt="Full View" style={{ maxWidth: "90%", maxHeight: "90%" }} />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
