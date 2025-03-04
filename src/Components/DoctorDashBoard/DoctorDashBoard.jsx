import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import "./DoctorDashBoard.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DoctorDashBoard = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uid, setUid] = useState();
  const [appointments, setAppointments] = useState([]);
  const [consultationReports, setConsultationReports] = useState({});
  const [selectedTime, setSelectedTime] = useState({});
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [googleMeetLink, setGoogleMeetLink] = useState("");
  const [meetingIdInputs, setMeetingIdInputs] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (uid) {
        const q = query(
          collection(db, "appointments"),
          where("doctorId", "==", uid)
        );
        const querySnapshot = await getDocs(q);
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsData);
      }
    };
    fetchAppointments();
  }, [uid]);

  useEffect(() => {
    const fetchConsultationReports = async () => {
      try {
        const reportsSnapshot = await getDocs(
          collection(db, "consultationReports")
        );
        const reportsData = {};
        reportsSnapshot.forEach((doc) => {
          const data = doc.data();
          const appointmentId = data.appointmentId;
          if (!reportsData[appointmentId]) {
            reportsData[appointmentId] = [];
          }
          reportsData[appointmentId].push(data.report);
        });
        setConsultationReports(reportsData);
      } catch (error) {
        console.error("Error fetching consultation reports:", error);
      }
    };
    fetchConsultationReports();
  }, []);
  const [ismobile, setmobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 800) setmobile(true);
  }),
    [];
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleAcceptAppointment = (appointmentId) => {
    setCurrentAppointmentId(appointmentId);
    setShowTimeInput(true);
    const meetLink = "https://meet.google.com/landing";
    setGoogleMeetLink(meetLink);
  };

  const handleRejectAppointment = async (appointmentId) => {
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, { status: "Rejected" });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId ? { ...appt, status: "Rejected" } : appt
        )
      );
    } catch (error) {
      console.error("Error rejecting appointment:", error);
    }
  };

  const handleTimeChange = (event) => {
    setSelectedTime({
      ...selectedTime,
      [currentAppointmentId]: event.target.value,
    });
  };

  const handleConfirmTime = async () => {
    if (!selectedTime[currentAppointmentId]) {
      toast.error("Please select a time for the appointment.");
      return;
    }

    try {
      const appointmentRef = doc(db, "appointments", currentAppointmentId);
      await updateDoc(appointmentRef, {
        status: "Accepted",
        appointmentTime: selectedTime[currentAppointmentId],
        googleMeetLink,
      });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === currentAppointmentId
            ? {
                ...appt,
                status: "Accepted",
                appointmentTime: selectedTime[currentAppointmentId],
                googleMeetLink,
              }
            : appt
        )
      );
      setShowTimeInput(false);
      setCurrentAppointmentId(null);
      setGoogleMeetLink("");
    } catch (error) {
      console.error("Error accepting appointment:", error);
    }
  };

  const handleMeetingIdChange = (appointmentId, event) => {
    setMeetingIdInputs({
      ...meetingIdInputs,
      [appointmentId]: event.target.value,
    });
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const handleSaveMeetingId = async (appointmentId) => {
    const meetingId = meetingIdInputs[appointmentId];

    if (!meetingId) {
      toast.success("Meeting ID saved successfully!",{
        style:{
          color:"white"
        }
      });
      return;
    }

    try {

      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, { meetingId });

      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.id === appointmentId ? { ...appt, meetingId } : appt
        )
      );
      setMeetingIdInputs((prevInputs) => {
        const updatedInputs = { ...prevInputs };
        delete updatedInputs[appointmentId];
        //toast.success("Meeting ID saved successfully!");
        return updatedInputs;
      });toast.success("Meeting ID saved successfully!");
    } catch (error) {
      toast.error("Failed to save Meeting ID.");
      console.error("Error saving meeting ID:", error);
    }
  };

  return (
    <>
      {!ismobile ? (
        <div className="doctor-dashboard">
          <h2>Doctor Dashboard</h2>
          <h3>Your Appointments</h3>
          {appointments.length === 0 ? (
            <p className="no-appointments">No appointments scheduled.</p>
          ) : (
            <div className="appointments-table-container">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <th>Time</th>
                    <th>Google Meet Link</th>
                    <th>Meeting ID</th>
                    <th>Consultation Reports</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.appointmentDate}</td>
                      <td
                        className={`status-${appointment.status.toLowerCase()}`}
                      >
                        {appointment.status}
                      </td>
                      <td>
                        {appointment.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleAcceptAppointment(appointment.id)
                              }
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleRejectAppointment(appointment.id)
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {(appointment.status === "Accepted" ||
                          appointment.status === "Rejected") && <span>-</span>}
                      </td>
                      <td>
                        {appointment.status === "Rejected" ? (
                          <span>-</span>
                        ) : showTimeInput &&
                          currentAppointmentId === appointment.id ? (
                          <div>
                            <input
                            className="meeting-id"
                              type="time"
                              value={selectedTime[currentAppointmentId] || ""}
                              onChange={handleTimeChange}
                            />
                            <button onClick={handleConfirmTime}>Confirm</button>
                          </div>
                        ) : (
                          appointment.appointmentTime || "-"
                        )}
                      </td>
                      <td>
                        {appointment.status === "Rejected" ? (
                          <span>-</span>
                        ) : appointment.googleMeetLink ? (
                          <a
                            href={appointment.googleMeetLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Create Meeting
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {appointment.status === "Rejected" ? (
                          <span>-</span>
                        ) : appointment.status === "Accepted" ? (
                          <div>
                            <input
                              type="text"
                              className="meeting-id"
                              value={
                                meetingIdInputs[appointment.id] ||
                                appointment.meetingId ||
                                ""
                              }
                              onChange={(e) =>
                                handleMeetingIdChange(appointment.id, e)
                              }
                              placeholder="Enter Meeting ID"
                            />
                            <button
                              onClick={() =>
                                handleSaveMeetingId(appointment.id)
                              }
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {consultationReports[appointment.id]?.length > 0 ? (
                          <ul className="report-list">
                            {consultationReports[appointment.id].map(
                              (reportUrl, index) => (
                                <li
                                  key={index}
                                  onClick={() => openModal(reportUrl)}
                                >
                                  <img
                                    src={reportUrl}
                                    alt={`Report ${index + 1}`}
                                    className="report-thumbnail"
                                  />
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <span>No reports</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {isModalOpen && selectedImage && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="close-btn" onClick={closeModal}>
                  &times;
                </span>
                <img
                  src={selectedImage}
                  alt="Consultation Report"
                  className="modal-image"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="doctor-dashboard">
          <h2>Doctor Dashboard</h2>
          <h3>Your Appointments</h3>
          {appointments.length === 0 ? (
            <p className="no-appointments">No appointments scheduled.</p>
          ) : (
            <div className="appointments-container">
              {appointments.map((appointment) => (
                <div className="appointment-card" key={appointment.id}>
                  <div className="appointment-header">
                    <h4>{appointment.patientName}</h4>
                    <p>{appointment.appointmentDate}</p>
                  </div>
                  <div className="appointment-details">
                    <p>
                      Status:{" "}
                      <span
                        className={`status-${appointment.status.toLowerCase()}`}
                      >
                        {appointment.status}
                      </span>
                    </p>
                    {appointment.status === "Pending" && (
                      <div>
                        <button
                          onClick={() =>
                            handleAcceptAppointment(appointment.id)
                          }
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleRejectAppointment(appointment.id)
                          }
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {(appointment.status === "Accepted" ||
                      appointment.status === "Rejected") && <span>-</span>}
                    {appointment.status === "Rejected" ? (
                      <span>-</span>
                    ) : showTimeInput &&
                      currentAppointmentId === appointment.id ? (
                      <div>
                        <input
                          type="time"
                          value={selectedTime[currentAppointmentId] || ""}
                          onChange={handleTimeChange}
                        />
                        <button onClick={handleConfirmTime}>Confirm</button>
                      </div>
                    ) : (
                      appointment.appointmentTime || "-"
                    )}
                    {appointment.status === "Rejected" ? (
                      <span>-</span>
                    ) : appointment.googleMeetLink ? (
                      <a
                        href={appointment.googleMeetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Create Meeting
                      </a>
                    ) : (
                      "-"
                    )}
                    {appointment.status === "Rejected" ? (
                      <span>-</span>
                    ) : appointment.status === "Accepted" ? (
                      <div>
                        <input
                          type="text"
                          value={
                            meetingIdInputs[appointment.id] ||
                            appointment.meetingId ||
                            ""
                          }
                          onChange={(e) =>
                            handleMeetingIdChange(appointment.id, e)
                          }
                          placeholder="Enter Meeting ID"
                        />
                        <button
                          onClick={() => handleSaveMeetingId(appointment.id)}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      "-"
                    )}
                  </div>
                  <div className="consultation-reports">
                    {consultationReports[appointment.id]?.length > 0 ? (
                      <ul className="report-list">
                        {consultationReports[appointment.id].map(
                          (reportUrl, index) => (
                            <li
                              key={index}
                              onClick={() => openModal(reportUrl)}
                            >
                              <img
                                src={reportUrl}
                                alt={`Report ${index + 1}`}
                                className="report-thumbnail"
                              />
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <span>No reports</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {isModalOpen && selectedImage && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="close-btn" onClick={closeModal}>
                  &times;
                </span>
                <img
                  src={selectedImage}
                  alt="Consultation Report"
                  className="modal-image"
                />
              </div>
             
            </div>
          )}
        </div>
      )}
      <ToastContainer/>
    </>
  );
};

export default DoctorDashBoard;
