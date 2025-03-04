// import React, { useEffect, useState } from "react";
// import { db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// // import doctorImages from "../assets/doctorImages";
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
// const Doctors = () => {
//   const getDoctorImage = (id) => {
//     switch (id) {
//       case 1:
//         return d1;
//       case 2:
//         return d2;
//       case 3:
//         return d81;
//       case 4:
//         return d4;
//       case 5:
//         return d5;
//       case 6:
//         return d6;
//       case 7:
//         return d7;
//       case 8:
//         return d8;
//       case 9:
//         return d9;
//       case 10:
//         return d10;
//       case 11:
//         return d11;
//       case 12:
//         return d12;
//       default:
//         return d1; // Default image if no match is found
//     }
//   };
//   const [doctors, setDoctors] = useState([]);
//   const navigate = useNavigate();

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

//   return (
//     <section className="doctor-list">
//       <h2 className="title">Top Doctors to Book</h2>
//       <p className="subtitle">
//         Simply browse through our extensive list of trusted doctors.
//       </p>
//       <div className="doctor-grid">
//         {doctors &&
//           doctors.map((doctor, index) => (
//             <div
//               key={doctor.id}
//               className="doctor-card"
//               onClick={() =>
//                 navigate(`/doctorprofile/${doctor.id}`, {
//                   state: index + 1,
//                 })
//               }
//               // onClick={() => navigate(`/doctorprofile/${doctor.id}`)}
//             >
//               <img
//                 src={doctor.profileImage || getDoctorImage(index + 1)}
//                 alt={doctor.name}
//                 className="doctor-img"
//               />
//               <h3 className="doctor-name">{doctor.name}</h3>
//               <p className="specialty">{doctor.fieldOfStudy}</p>
//               <p className="year specialty">
//                 Currently MBBS {doctor.year} year
//               </p>
//             </div>
//           ))}
//       </div>
//     </section>
//   );
// };

// export default Doctors;

import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// import doctorImages from "../assets/doctorImages";
import d1 from "../../assets/d1.png";
import d2 from "../../assets/d2.png";
import d81 from "../../assets/d8.jpg";
import d4 from "../../assets/d4.jpg";
import d5 from "../../assets/d5.jpg";
import d6 from "../../assets/d6.jpg";
import d7 from "../../assets/d7.jpg";
import d8 from "../../assets/d8.jpg";
import d9 from "../../assets/d9.jpg";
import d10 from "../../assets/d10.jpg";
import d11 from "../../assets/d11.jpg";
import d12 from "../../assets/d12.jpg";
import "./Doctors.css";
const Doctors = () => {
  const getDoctorImage = (id) => {
    switch (id) {
      case 1:
        return d1;
      case 2:
        return d2;
      case 3:
        return d81;
      case 4:
        return d4;
      case 5:
        return d5;
      case 6:
        return d6;
      case 7:
        return d7;
      case 8:
        return d8;
      case 9:
        return d9;
      case 10:
        return d10;
      case 11:
        return d11;
      case 12:
        return d12;
      default:
        return d1; // Default image if no match is found
    }
  };

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, "doctors"));
      const doctorList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Filter doctors where verified is true
      const verifiedDoctors = doctorList.filter(
        (doctor) => doctor.verified === true
      );
      setDoctors(verifiedDoctors);
    };
    fetchDoctors();
  }, []);

  return (
    <section className="doctor-list">
      <h2 className="title">Top Doctors to Book</h2>
      {/* <p className="subtitle">
        Simply browse through our extensive list of trusted doctors.
      </p> */}
      <div className="doctor-grid">
        {doctors &&
          doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="doctor-card"
              onClick={() =>
                navigate(`/doctorprofile/${doctor.id}`, {
                  state: index + 1,
                })
              }
            >
              <img
                src={doctor.profileImage || getDoctorImage(index + 1)}
                alt={doctor.name}
                className="doctor-img"
              />
              <h3 className="doctor-name">{doctor.name}</h3>
              <div className="d-flex">
                <p className="specialty">{doctor.fieldOfStudy}</p>
                <p className="year specialty">MBBS {doctor.year} year</p>
              </div>
              {/* <p className="specialty">{doctor.fieldOfStudy}</p>
            <p className="year specialty">
              MBBS {doctor.year} year
            </p> */}
            </div>
          ))}
      </div>
    </section>
  );
};

export default Doctors;
