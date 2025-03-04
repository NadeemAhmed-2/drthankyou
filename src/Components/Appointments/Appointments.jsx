// import React, { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   getDoc,
//   doc,
// } from "firebase/firestore";
// import "./appointment.css";
// import Navbar from "../Navbar";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import styl
// const Appointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploadedReports, setUploadedReports] = useState({});
//   const user = getAuth().currentUser; // Get current logged-in user
//   const [ismobile, setmobile] = useState(false);
//   useEffect(() => {
//     if (window.innerWidth <= 500) setmobile(true);
//   }, []);
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       if (user) {
//         const db = getFirestore();
//         const appointmentsRef = collection(db, "appointments");
//         const q = query(appointmentsRef, where("patientId", "==", user.uid)); // Fetch appointments for logged-in user

//         try {
//           const querySnapshot = await getDocs(q);
//           const userAppointments = [];

//           querySnapshot.forEach((doc) => {
//             const appointmentData = doc.data();
//             userAppointments.push({
//               id: doc.id,
//               doctorName: appointmentData.DoctorName,
//               appointmentDate: appointmentData.appointmentDate,
//               status: appointmentData.status,
//               timing: appointmentData.appointmentTime,
//               meetingId: appointmentData.meetingId,
//             });
//           });

//           // Sort appointments by date
//           userAppointments.sort(
//             (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
//           );

//           setAppointments(userAppointments);
//         } catch (error) {
//           console.error("Error fetching appointments:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchAppointments();
//   }, [user]);

//   const handleFileChange = (e, appointmentId) => {
//     const files = e.target.files;
//     const filesArray = Array.from(files).map((file) => ({
//       file,
//       base64: "",
//     }));
//     setSelectedFiles((prevFiles) => ({
//       ...prevFiles,
//       [appointmentId]: filesArray,
//     }));

//     // Convert files to Base64
//     filesArray.forEach((fileObj, index) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         const updatedFiles = [...filesArray];
//         updatedFiles[index].base64 = base64String;
//         setSelectedFiles((prevFiles) => ({
//           ...prevFiles,
//           [appointmentId]: updatedFiles,
//         }));
//       };
//       reader.readAsDataURL(fileObj.file);
//     });
//   };

//   const handleUpload = async (appointmentId) => {
//     if (!selectedFiles[appointmentId]) return;
//      toast.success("Reports added!",{
//       style:{
//         color:"white"
//       }
//      })
//     const db = getFirestore();
//     const reportsRef = collection(db, "consultationReports");

//     try {
//       const reportPromises = selectedFiles[appointmentId].map(
//         async (fileObj) => {
//           const reportDocRef = await addDoc(reportsRef, {
//             appointmentId,
//             report: fileObj.base64,
//             createdAt: new Date(),
//           });
//           return reportDocRef.id;
//         }
//       );

//       const reportIds = await Promise.all(reportPromises);

//       // Save the report IDs in the appointment document
//       const appointmentDocRef = doc(db, "appointments", appointmentId);
//       const appointmentDocSnap = await getDoc(appointmentDocRef);
//       if (appointmentDocSnap.exists()) {
//         await setDoc(
//           appointmentDocRef,
//           { reportIds: reportIds },
//           { merge: true }
//         );
//       }

//       alert("Reports uploaded successfully.");
//     } catch (error) {
//       console.error("Error uploading reports:", error);
//     }
//   };

//   const fetchReports = async (appointmentId) => {
//     const db = getFirestore();
//     const reportsRef = collection(db, "consultationReports");
//     const q = query(reportsRef, where("appointmentId", "==", appointmentId));
//     const querySnapshot = await getDocs(q);

//     const reports = [];
//     querySnapshot.forEach((doc) => {
//       reports.push(doc.data().report);
//     });

//     setUploadedReports((prevReports) => ({
//       ...prevReports,
//       [appointmentId]: reports,
//     }));
//   };

//   useEffect(() => {
//     appointments.forEach((appointment) => {
//       if (appointment.status === "Accepted") {
//         fetchReports(appointment.id);
//       }
//     });
//   }, [appointments]);

//   if (loading) return <div className="loading">Loading appointments...</div>;

//   return (
//     <>
//       <Navbar />
//       {!ismobile ? (
//         <div className="appointments-container">
//           <h2>Your Appointments</h2>
//           {appointments.length === 0 ? (
//             <p className="no-appointments">You have no appointments.</p>
//           ) : (
//             <div className="table-container">
//               <table className="appointments-table">
//                 <thead>
//                   <tr>
//                     <th>Doctor Name</th>
//                     <th>Appointment Date</th>
//                     <th>Status</th>
//                     <th>Timing</th>
//                     <th>Meeting</th>
//                     <th>Upload Reports</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {appointments.map((appointment) => (
//                     <tr key={appointment.id}>
//                       <td>{appointment.doctorName}</td>
//                       <td>{appointment.appointmentDate}</td>
//                       <td
//                         className={
//                           appointment.status === "Approved"
//                             ? "status-approved"
//                             : appointment.status === "Rejected"
//                             ? "status-rejected"
//                             : appointment.status === "Accepted"
//                             ? "status-accepted"
//                             : "status-pending"
//                         }
//                       >
//                         {appointment.status}
//                       </td>
//                       <td>
//                         {appointment.timing
//                           ? appointment.timing
//                           : "Not selected by doctor"}
//                       </td>
//                       <td className="meeting-link">
//                         {appointment.meetingId &&
//                         appointment.meetingId !== "not yet decided" ? (
//                           <a
//                             href={appointment.meetingId}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                           >
//                             Join Meeting
//                           </a>
//                         ) : (
//                           "Not yet decided"
//                         )}
//                       </td>
//                       {appointment.status === "Accepted" && (
//                         <td>
//                           <input
//                             type="file"
//                             multiple
//                             onChange={(e) =>
//                               handleFileChange(e, appointment.id)
//                             }
//                           />
//                           <button
//                             onClick={() => handleUpload(appointment.id)}
//                             disabled={!selectedFiles[appointment.id]}
//                           >
//                             Upload Reports
//                           </button>
//                           <div
//                             className="flex"
//                             style={{ display: "flex", gap: "10px" }}
//                           >
//                             {uploadedReports[appointment.id] &&
//                               uploadedReports[appointment.id].map(
//                                 (report, index) => (
//                                   <div key={index}>
//                                     <img
//                                       style={{ width: "50px", height: "50px" }}
//                                       src={report}
//                                       alt={`Report ${index + 1}`}
//                                       // style={{ maxWidth: "200px", maxHeight: "200px" }}
//                                     />
//                                   </div>
//                                 )
//                               )}
//                           </div>
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="appointments-container">
//           <h2>Your Appointments</h2>
//           {appointments.length === 0 ? (
//             <p className="no-appointments">You have no appointments.</p>
//           ) : (
//             <div className="appointments-list">
//               {appointments.map((appointment) => (
//                 <div key={appointment.id} className="appointment-card">
//                   <h3>{appointment.doctorName}</h3>
//                   <p>Date: {appointment.appointmentDate}</p>
//                   <p>
//                     Status:{" "}
//                     <span
//                       className={`status-${appointment.status.toLowerCase()}`}
//                     >
//                       {appointment.status}
//                     </span>
//                   </p>
//                   <p>
//                     Time:{" "}
//                     {appointment.appointmentTime || "Not selected by doctor"}
//                   </p>
//                   {appointment.meetingId !== "not yet decided" && (
//                     <a
//                       href={appointment.meetingId}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="join-meeting"
//                     >
//                       Join Meeting
//                     </a>
//                   )}
//                   {appointment.status === "Accepted" && (
//                     <div className="upload-section">
//                       <input
//                         type="file"
//                         multiple
//                         onChange={(e) => handleFileChange(e, appointment.id)}
//                       />
//                       <button onClick={() => handleUpload(appointment.id)}>
//                         Upload Reports
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//       <ToastContainer/>
//     </>
//   );
// };

// export default Appointments;

import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import "./appointment.css";
import Navbar from "../Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedReports, setUploadedReports] = useState({});
  const user = getAuth().currentUser; // Get current logged-in user
  const [ismobile, setmobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 500) setmobile(true);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        const db = getFirestore();
        const appointmentsRef = collection(db, "appointments");
        const q = query(appointmentsRef, where("patientId", "==", user.uid)); // Fetch appointments for logged-in user

        try {
          const querySnapshot = await getDocs(q);
          const userAppointments = [];

          querySnapshot.forEach((doc) => {
            const appointmentData = doc.data();
            userAppointments.push({
              id: doc.id,
              doctorName: appointmentData.DoctorName,
              appointmentDate: appointmentData.appointmentDate,
              status: appointmentData.status,
              timing: appointmentData.appointmentTime,
              meetingId: appointmentData.meetingId,
            });
          });

          // Sort appointments by date
          userAppointments.sort(
            (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
          );

          setAppointments(userAppointments);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [user]);

  const handleFileChange = (e, appointmentId) => {
    const files = e.target.files;
    const filesArray = Array.from(files).map((file) => ({
      file,
      base64: "",
    }));
    setSelectedFiles((prevFiles) => ({
      ...prevFiles,
      [appointmentId]: filesArray,
    }));

    // Convert files to Base64
    filesArray.forEach((fileObj, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        const updatedFiles = [...filesArray];
        updatedFiles[index].base64 = base64String;
        setSelectedFiles((prevFiles) => ({
          ...prevFiles,
          [appointmentId]: updatedFiles,
        }));
      };
      reader.readAsDataURL(fileObj.file);
    });
  };

  const handleUpload = async (appointmentId) => {
    if (!selectedFiles[appointmentId]) return;

    toast.success("Reports added!", {
      style: {
        color: "white",
      },
    });

    const db = getFirestore();
    const reportsRef = collection(db, "consultationReports");

    try {
      const reportPromises = selectedFiles[appointmentId].map(
        async (fileObj) => {
          const reportDocRef = await addDoc(reportsRef, {
            appointmentId,
            report: fileObj.base64,
            createdAt: new Date(),
          });
          return reportDocRef.id;
        }
      );

      const reportIds = await Promise.all(reportPromises);

      // Save the report IDs in the appointment document
      const appointmentDocRef = doc(db, "appointments", appointmentId);
      const appointmentDocSnap = await getDoc(appointmentDocRef);
      if (appointmentDocSnap.exists()) {
        await setDoc(
          appointmentDocRef,
          { reportIds: reportIds },
          { merge: true }
        );
      }

      alert("Reports uploaded successfully.");
    } catch (error) {
      console.error("Error uploading reports:", error);
    }
  };

  const fetchReports = async (appointmentId) => {
    const db = getFirestore();
    const reportsRef = collection(db, "consultationReports");
    const q = query(reportsRef, where("appointmentId", "==", appointmentId));
    const querySnapshot = await getDocs(q);

    const reports = [];
    querySnapshot.forEach((doc) => {
      reports.push(doc.data().report);
    });

    setUploadedReports((prevReports) => ({
      ...prevReports,
      [appointmentId]: reports,
    }));
  };

  useEffect(() => {
    if (appointments.length > 0) {
      appointments.forEach((appointment) => {
        if (appointment.status === "Accepted") {
          fetchReports(appointment.id);
        }
      });
    }
  }, [appointments]);

  useEffect(() => {
    if (appointments.length > 0) {
      appointments.forEach((appointment) => {
        if (appointment.status === "Accepted") {
          fetchReports(appointment.id);
        }
      });
    }
  }, []);

  if (loading) return <div className="loading">Loading appointments...</div>;

  return (
    <>
      <Navbar />
      {!ismobile ? (
        <div className="appointments-container">
          <h2>Your Appointments</h2>
          {appointments.length === 0 ? (
            <p className="no-appointments">You have no appointments.</p>
          ) : (
            <div className="table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Appointment Date</th>
                    <th>Status</th>
                    <th>Timing</th>
                    <th>Meeting</th>
                    <th>Upload Reports</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.appointmentDate}</td>
                      <td
                        className={
                          appointment.status === "Approved"
                            ? "status-approved"
                            : appointment.status === "Rejected"
                            ? "status-rejected"
                            : appointment.status === "Accepted"
                            ? "status-accepted"
                            : "status-pending"
                        }
                      >
                        {appointment.status}
                      </td>
                      <td>
                        {appointment.timing
                          ? appointment.timing
                          : "Not selected by doctor"}
                      </td>
                      <td className="meeting-link">
                        {appointment.meetingId &&
                        appointment.meetingId !== "not yet decided" ? (
                          <a
                            href={appointment.meetingId}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Join Meeting
                          </a>
                        ) : (
                          "Not yet decided"
                        )}
                      </td>
                      {appointment.status === "Accepted" && (
                        <td>
                          <input
                            type="file"
                            multiple
                            onChange={(e) =>
                              handleFileChange(e, appointment.id)
                            }
                          />
                          <button
                            onClick={() => handleUpload(appointment.id)}
                            disabled={!selectedFiles[appointment.id]}
                          >
                            Upload Reports
                          </button>
                          <div
                            className="flex"
                            style={{ display: "flex", gap: "10px" }}
                          >
                            {uploadedReports[appointment.id] &&
                              uploadedReports[appointment.id].map(
                                (report, index) => (
                                  <div key={index}>
                                    <img
                                      style={{ width: "50px", height: "50px" }}
                                      src={report}
                                      alt={`Report ${index + 1}`}
                                    />
                                  </div>
                                )
                              )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="appointments-container">
          <h2>Your Appointments</h2>
          {appointments.length === 0 ? (
            <p className="no-appointments">You have no appointments.</p>
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <h3>{appointment.doctorName}</h3>
                  <p>Date: {appointment.appointmentDate}</p>
                  <p>
                    Status:{" "}
                    <span
                      className={`status-${appointment.status.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>
                  </p>
                  <p>
                    Time:{" "}
                    {appointment.timing || "Not selected by doctor"}
                  </p>
                  {appointment.meetingId !== "not yet decided" && (
                    <a
                      href={appointment.meetingId}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="join-meeting"
                    >
                      Join Meeting
                    </a>
                  )}
                  {appointment.status === "Accepted" && (
                    <div className="upload-section">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileChange(e, appointment.id)}
                      />
                      <button onClick={() => handleUpload(appointment.id)}>
                        Upload Reports
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Appointments;
