
// import React, { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import "./AllDoctors.css";
// import Navbar from "../Navbar";

// // Importing doctor images
// import d1 from "../../assets/d1.png";
// import d2 from "../../assets/d2.png";
// import d81 from "../../assets/d8.jpg";
// import d4 from "../../assets/d4.jpg";
// import d5 from "../../assets/d5.jpg";
// import d6 from "../../assets/d6.jpg";
// import d7 from "../../assets/d7.jpg";
// import d8 from "../../assets/d8.jpg";
// import d9 from "../../assets/d9.jpg";
// import d10 from "../../assets/d10.jpg";
// import d11 from "../../assets/d11.jpg";
// import d12 from "../../assets/d12.jpg";
// import { IoReorderThreeOutline } from "react-icons/io5";
// const AllDoctors = () => {
//   const navigate = useNavigate();
//   const [doctors, setDoctors] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const specialties = [
//     "Cardiologist",
//     "Dermatologist",
//     "Neurologist",
//     "Pediatrician",
//     "Orthopedician",
//     "General physician",
//     "Gynecologist",
//     "Gastroenterologist",
//     "ENT",
//     "Pulmonologist",
//   ];

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       const querySnapshot = await getDocs(collection(db, "doctors"));
//       const doctorList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setDoctors(doctorList);
//     };
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     setIsMobile(window.innerWidth <= 768);
//   }, []);

//   const doctorImages = [d1, d2, d81, d4, d5, d6, d7, d8, d9, d10, d11, d12];
//   const getDoctorImage = (index) => doctorImages[index % doctorImages.length];

//   const filteredDoctors = doctors.filter((doctor) => {
//     const doctorName = doctor.name?.toLowerCase() || "";
//     const doctorField = doctor.fieldOfStudy?.toLowerCase() || "";
//     const isVerified = doctor.verified === true;
//     const query = searchQuery.toLowerCase();
//     const matchesSearch =
//       query === "" || doctorName.includes(query) || doctorField.includes(query);
//     const matchesSpecialty =
//       selectedSpecialty === "" || doctor.fieldOfStudy === selectedSpecialty;
//     return isVerified && matchesSearch && matchesSpecialty;
//   });

//   const clearFilters = () => {
//     setSearchQuery("");
//     setSelectedSpecialty("");
//     setSidebarOpen(false);
//   };

//   const handleOutsideClick = (event) => {
//     if (
//       !event.target.closest(".sidebar") &&
//       !event.target.closest(".menu-icon")
//     ) {
//       setSidebarOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (sidebarOpen) {
//       document.addEventListener("click", handleOutsideClick);
//     } else {
//       document.removeEventListener("click", handleOutsideClick);
//     }
//     return () => document.removeEventListener("click", handleOutsideClick);
//   }, [sidebarOpen]);

//   return (
//     <>
//       <Navbar />
//       <div className="search-container">
//         {filteredDoctors.length >=0 &&
//         <input
//           type="text"
//           className="search-bar"
//           placeholder="Search ..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />}
//         {!isMobile && 
//           <button className="clear-button" onClick={clearFilters}>
//             Remove Filter
//           </button>
//         }
//         {/* <button className="clear-button" onClick={clearFilters}>
//           Remove Filter
//         </button> */}
//       </div>

//       {/* Three-dot menu for mobile */}
//       {isMobile && (
//         <button
//           className="menu-icon"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           <IoReorderThreeOutline
//             size={40}
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           />
//         </button>
//       )}

//       <div className="doctors-container">
//         {/* Sidebar (hidden on mobile until menu is clicked) */}
//         <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
//           {!isMobile && <h3>Filter by Specialization</h3>}
//           {specialties.map((specialty) => (
//             <button
//               key={specialty}
//               className={selectedSpecialty === specialty ? "active" : ""}
//               onClick={() => {
//                 setSelectedSpecialty(specialty);
//                 setSidebarOpen(false); // Close sidebar when an option is selected
//               }}
//             >
//               {specialty}
//             </button>
//           ))}
//           <button className="clear-button" onClick={clearFilters}>
//             Clear Filter
//           </button>
//         </div>

//         {/* Doctors List */}
//         <div className={`doctor-grid ${isMobile && sidebarOpen ? "hidden" : ""}`}>
//           {filteredDoctors.length > 0 ? (
//             filteredDoctors.map((doctor, index) => (
//               <div
//                 key={doctor.id}
//                 className="doctor-card"
//                 onClick={() => navigate(`/doctorprofile/${doctor.id}`)}
//               >
//                 <img
//                   src={doctor.profileImage || getDoctorImage(index)}
//                   alt={doctor.name}
//                   className="doctor-img"
//                 />
//                 <h3 className="doctor-name">{doctor.name}</h3>
//                 <p className="specialty">{doctor.fieldOfStudy}</p>
//               </div>
//             ))
//           ) : (
//             <p className="no-results">No doctors found.</p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllDoctors;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./AllDoctors.css";
import Navbar from "../Navbar";
import { IoReorderThreeOutline } from "react-icons/io5";

// Importing doctor images
import d1 from "../../assets/d1.png";
import d2 from "../../assets/d2.png";
import d3 from "../../assets/d3.jpg";
import d4 from "../../assets/d4.jpg";
import d5 from "../../assets/d5.jpg";
import d6 from "../../assets/d6.jpg";
import d7 from "../../assets/d7.jpg";
import d8 from "../../assets/d8.jpg";
import d9 from "../../assets/d9.jpg";
import d10 from "../../assets/d10.jpg";
import d11 from "../../assets/d11.jpg";
import d12 from "../../assets/d12.jpg";

const doctorImages = [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12];

const AllDoctors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Fetch doctors from Firebase
  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      const doctorList = querySnapshot.docs.map((doc, index) => ({
        id: doc.id,
        image: doc.data().profileImage || doctorImages[index % doctorImages.length],
        ...doc.data(),
      }));
      setDoctors(doctorList);
    };
    fetchDoctors();
  }, []);

  // Handle responsive state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Read specialty filter from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedSpecialty(params.get("specialty") || "");
  }, [location.search]);

  // Filter doctors based on search & specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = searchQuery === "" || doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.fieldOfStudy === selectedSpecialty;
    return doctor.verified && matchesSearch && matchesSpecialty;
  });

  // Clear filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("");
    setSidebarOpen(false);
    navigate("/alldoctors");
  };

  return (
    <>
      <Navbar />
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search doctor..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {!isMobile && (
          <button className="clear-button" onClick={clearFilters}>
            Remove Filter
          </button>
        )}
      </div>

      {/* Sidebar Menu for Mobile */}
      {isMobile && (
        <button className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <IoReorderThreeOutline size={40} />
        </button>
      )}

      <div className="doctors-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          {!isMobile && <h3>Filter by Specialization</h3>}
          {[
            "Cardiologist",
            "Dermatologist",
            "Neurologist",
            "Pediatrician",
            "Orthopedician",
            "General physician",
            "Gynecologist",
            "Gastroenterologist",
            "ENT",
            "Pulmonologist",
          ].map((specialty) => (
            <button
              key={specialty}
              className={selectedSpecialty === specialty ? "active" : ""}
              onClick={() => {
                setSelectedSpecialty(specialty);
                setSidebarOpen(false);
                navigate(`/alldoctors?specialty=${encodeURIComponent(specialty)}`);
              }}
            >
              {specialty}
            </button>
          ))}
          <button className="clear-button" onClick={clearFilters}>
            Clear Filter
          </button>
        </div>

        {/* Doctors List */}
        <div className={`doctor-grid ${isMobile && sidebarOpen ? "hidden" : ""}`}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card dc-card" onClick={() => navigate(`/doctorprofile/${doctor.id}`)}>
                <img src={doctor.image} alt={doctor.name} className="doctor-img" />
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="specialty">{doctor.fieldOfStudy}</p>
              </div>
            ))
          ) : (
            <p className="no-results" >No doctors found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllDoctors;
