


// import React from "react";
// import "./Speciality.css";
// import phy from "../../assets/physician.jpg";
// import gyna from "../../assets/Gynachologist.jpg";
// import ped from "../../assets/pediatricians.jpg";
// import neu from "../../assets/neurologist.jpg";
// import gastro from "../../assets/gastro.jpg";
// import dermo from "../../assets/dermotolgist.jpg";
// import ent from "../../assets/ent.jpg";
// import ortho from "../../assets/ortho.jpg";
// import { useNavigate } from "react-router-dom";

// const specialties = [
//   {
//     id: 1,
//     name: "Dr. Richard James",
//     specialty: "General Physician",
//     year: "5",
//     image: phy,
//     description:
//       "General physicians diagnose and treat a variety of medical conditions, providing primary healthcare services.",
//   },
//   {
//     id: 2,
//     name: "Dr. Emily Larson",
//     specialty: "Gynecologist",
//     year: "5",
//     image: gyna,
//     description:
//       "Gynecologists specialize in female reproductive health, including pregnancy, childbirth, and hormonal disorders.",
//   },
//   {
//     id: 3,
//     name: "Dr. Sarah Patel",
//     specialty: "Neurologist",
//     year: "4",
//     image: neu,
//     description:
//       "Neurologists diagnose and treat conditions affecting the brain, spinal cord, and nervous system.",
//   },
//   {
//     id: 4,
//     name: "Dr. Christopher Lee",
//     specialty: "Pediatrician",
//     year: "4",
//     image: ped,
//     description:
//       "Pediatricians provide medical care for infants, children, and adolescents, ensuring their healthy growth and development.",
//   },
//   {
//     id: 5,
//     name: "Dr. Sophia Martinez",
//     specialty: "Gastroenterologist",
//     year: "4",
//     image: gastro,
//     description:
//       "Gastroenterologists specialize in the digestive system, diagnosing and treating stomach, liver, and intestinal disorders.",
//   },
//   {
//     id: 6,
//     name: "Dr. Michael Brown",
//     specialty: "Dermatologist",
//     year: "4",
//     image: dermo,
//     description:
//       "Dermatologists treat skin conditions, hair disorders, and provide cosmetic skin treatments.",
//   },
//   {
//     id: 7,
//     name: "Dr. Olivia Wilson",
//     specialty: "ENT Specialist",
//     year: "4",
//     image: ent,
//     description:
//       "ENT specialists diagnose and treat conditions related to the ear, nose, and throat.",
//   },
//   {
//     id: 8,
//     name: "Dr. Daniel Carter",
//     specialty: "Orthopedician",
//     year: "4",
//     image: ortho,
//     description:
//       "Orthopedicians specialize in treating musculoskeletal issues, including bone, joint, and ligament problems.",
//   },
// ];

// const Speciality = () => {
//   const navigate = useNavigate();

//   const handleSpecialtyClick = (specialty) => {
//     navigate(`/alldoctors?specialty=${specialty}`);
//   };

//   return (
//     <>
//       <h2 style={{marginTop:"30px",color:"black"}} className="title">Find your Specialist</h2>
//       <div className="specialties-container">
//         {specialties.map((doctor) => (
//           <div
//             key={doctor.id}
//             className="specialty-card"
//             onClick={() => handleSpecialtyClick(doctor.specialty)}
//           >
//             <img
//               src={doctor.image}
//               alt={doctor.name}
//               className="specialty-image"
//             />
//             <h2 className="specialty-title">{doctor.specialty}</h2>
//             {/* <p className="specialty-description">{doctor.description}</p> */}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Speciality;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./Speciality.css";
import phy from "../../assets/physician.jpg";
import gyna from "../../assets/Gynachologist.jpg";
import ped from "../../assets/pediatricians.jpg";
import neu from "../../assets/neurologist.jpg";
import gastro from "../../assets/gastro.jpg";
import dermo from "../../assets/dermotolgist.jpg";
import ent from "../../assets/ent.jpg";
import ortho from "../../assets/ortho.jpg";

const specialties = [
  { id: 1, name: "General physician", image: phy },
  { id: 2, name: "Gynecologist", image: gyna },
  { id: 3, name: "Neurologist", image: neu },
  { id: 4, name: "Pediatrician", image: ped },
  { id: 5, name: "Gastroenterologist", image: gastro },
  { id: 6, name: "Dermatologist", image: dermo },
  { id: 7, name: "ENT Specialist", image: ent },
  { id: 8, name: "Orthopedician", image: ortho },
];

const Speciality = () => {
  const navigate = useNavigate();

  const handleSpecialtyClick = (specialty) => {
    navigate(`/alldoctors?specialty=${encodeURIComponent(specialty)}`);
  };

  return (
    <>
      <h2 className="title">Find Your Specialist</h2>
      <div className="specialties-container">
        {specialties.map((specialty) => (
          <div
            key={specialty.id}
            className="specialty-card"
            onClick={() => handleSpecialtyClick(specialty.name)}
          >
            <img src={specialty.image} alt={specialty.name} className="specialty-image" />
            <h2 className="specialty-title">{specialty.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Speciality;
