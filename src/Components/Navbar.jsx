// // import React, { useState, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// // import { getFirestore, doc, getDoc } from "firebase/firestore";
// // import { FaUserDoctor, FaStethoscope, FaUserCheck } from "react-icons/fa6";
// // import { FaEllipsisV, FaHome } from "react-icons/fa";
// // import "./Navbar/Navbar.css"; // Ensure styles are correctly imported

// // const Navbar = () => {
// //   const [user, setUser] = useState(null);
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
// //   const [role, setRole] = useState(null);
// //   const [moreDropdown, setMoreDropdown] = useState(false);
// //   const [dropdown, setDropdown] = useState(false); // Added dropdown state for desktop navbar
// //   const nav = useNavigate();

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 768);
// //     };
// //     window.addEventListener("resize", handleResize);

// //     const auth = getAuth();
// //     const db = getFirestore();

// //     const unsubscribe = onAuthStateChanged(auth, async (user) => {
// //       if (user) {
// //         setUser(user);
// //         const doctorDoc = await getDoc(doc(db, "doctors", user.uid));
// //         setRole(doctorDoc.exists() ? "doctor" : "user");
// //       } else {
// //         setUser(null);
// //         setRole(null);
// //       }
// //     });

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //       unsubscribe();
// //     };
// //   }, []);

// //   const handleLogout = async () => {
// //     try {
// //       await signOut(getAuth());
// //       setMoreDropdown(false);
// //       setDropdown(false);
// //       nav("/login");
// //     } catch (error) {
// //       console.error("Logout failed:", error);
// //     }
// //   };

// //   // Close dropdowns when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         !event.target.closest(".more-dropdown-container") &&
// //         !event.target.closest(".navbar-dropdown")
// //       ) {
// //         setMoreDropdown(false);
// //         setDropdown(false);
// //       }
// //     };
// //     document.addEventListener("click", handleClickOutside);
// //     return () => document.removeEventListener("click", handleClickOutside);
// //   }, []);

// //   // ** Mobile Bottom Navbar **
// //   if (isMobile) {
// //     return (
// //       <div className="bottom-nav">
// //         <button onClick={() => nav("/")}>
// //           <FaHome size={22} />
// //           <span>Home</span>
// //         </button>
// //         <button onClick={() => nav("/alldoctors")}>
// //           <FaUserDoctor size={22} />
// //           <span>Doctors</span>
// //         </button>
// //         <button onClick={() => nav("/medicalform")}>
// //           <FaStethoscope size={22} />
// //           <span>MedAi</span>
// //         </button>
// //         <button
// //           onClick={() => setMoreDropdown(!moreDropdown)}
// //           className="more-dropdown-container"
// //         >
// //           <FaEllipsisV size={22} />
// //           <span>More</span>
// //         </button>

// //         {/* Dropdown positioned above the navbar */}
// //         {moreDropdown && (
// //           <div className="more-dropdown">
// //             {role === "user" && (
// //               <button onClick={() => nav("/myappointments")}>
// //                 My Appointments
// //               </button>
// //             )}
// //             {role === "doctor" && (
// //               <button onClick={() => nav("/doctordashboard")}>Dashboard</button>
// //             )}
// //             {user && (
// //               <>
// //                 <button
// //                   onClick={() =>
// //                     nav(role === "doctor" ? "/profiledoctor" : "/profile")
// //                   }
// //                 >
// //                   Profile
// //                 </button>
// //                 <button onClick={handleLogout}>Logout</button>
// //               </>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     );
// //   }

// //   // ** Desktop Navbar **
// //   return (
// //     <>
// //       <nav className="navbar">
// //         <div className="navbar-left">
// //           <Link to="/" className="navbar-logo">
// //             <span className="logo-name">Dr THANKYOU</span>
// //           </Link>
// //         </div>

// //         <div className="navbar-middle">
// //           <Link to="/" className="navbar-link">
// //             HOME
// //           </Link>
// //           <Link to="/alldoctors" className="navbar-link">
// //             DOCTORS
// //           </Link>
// //           <Link to="/medicalform" className="navbar-link">
// //             MedAi
// //           </Link>
// //           <Link to="/about" className="navbar-link">
// //             ABOUT
// //           </Link>
// //           <Link to="/contact" className="navbar-link">
// //             CONTACT
// //           </Link>
// //           {role === "doctor" && (
// //             <Link to="/doctordashboard" className="navbar-link">
// //               Dashboard
// //             </Link>
// //           )}
// //           {role === "user" && (
// //             <Link to="/myappointments" className="navbar-link">
// //               My Appointments
// //             </Link>
// //           )}
// //         </div>

// //         <div className="navbar-right">
// //           {user ? (
// //             <div className="navbar-dropdown">
// //               <FaUserCheck size={35} onClick={() => setDropdown(!dropdown)} />
// //               {dropdown && (
// //                 <div className="dropdown-menu">
// //                   <Link
// //                     to={role === "doctor" ? "/profiledoctor" : "/profile"}
// //                     className="dropdown-item"
// //                   >
// //                     My Profile
// //                   </Link>
// //                   <button className="dropdown-item" onClick={handleLogout}>
// //                     Logout
// //                   </button>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <Link to="/signup" className="navbar-button">
// //               Create Account
// //             </Link>
// //           )}
// //         </div>
// //       </nav>
// //       <hr />
// //     </>
// //   );
// // };

// // export default Navbar;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { FaUserDoctor, FaStethoscope, FaUserCheck } from "react-icons/fa6";
// import { FaEllipsisV, FaHome } from "react-icons/fa";
// import "./Navbar/Navbar.css"; // Ensure styles are correctly imported

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [role, setRole] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [dropdown, setDropdown] = useState(false);
//   const [moreDropdown, setMoreDropdown] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", handleResize);

//     const auth = getAuth();
//     const db = getFirestore();

//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);
//         try {
//           const doctorDoc = await getDoc(doc(db, "doctors", user.uid));
//           setRole(doctorDoc.exists() ? "doctor" : "user");
//         } catch (error) {
//           console.error("Error fetching role:", error);
//           setRole(null);
//         }
//       } else {
//         setUser(null);
//         setRole(null);
//       }
//       console.log(role);
//     });

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       unsubscribe();
//     };
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(getAuth());
//       setDropdown(false);
//       setMoreDropdown(false);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".navbar-dropdown, .more-dropdown-container")) {
//         setDropdown(false);
//         setMoreDropdown(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   /** ==========================
//    *  ✅ MOBILE BOTTOM NAVBAR ✅
//    ============================ */
//   if (isMobile) {
//     return (
//       <div className="bottom-nav">
//         <button onClick={() => navigate("/")}>
//           <FaHome size={22} />
//           <span>Home</span>
//         </button>
//         <button onClick={() => navigate("/alldoctors")}>
//           <FaUserDoctor size={22} />
//           <span>Doctors</span>
//         </button>
//         <button onClick={() => navigate("/medicalform")}>
//           <FaStethoscope size={22} />
//           <span>MedAi</span>
//         </button>
//         <button
//           onClick={() => setMoreDropdown(!moreDropdown)}
//           className="more-dropdown-container"
//         >
//           <FaEllipsisV size={22} />
//           <span>More</span>
//         </button>

//         {/* Dropdown positioned above the navbar */}
//         {moreDropdown && (
//           <div className="more-dropdown">
//             {role === "user" && (
//               <button onClick={() => navigate("/myappointments")}>
//                 My Appointments
//               </button>
//             )}
//             {role === "doctor" && (
//               <button onClick={() => navigate("/doctordashboard")}>
//                 Dashboard
//               </button>
//             )}
//             {user && (
//               <>
//                 <button
//                   onClick={() =>
//                     navigate(role === "doctor" ? "/profiledoctor" : "/profile")
//                   }
//                 >
//                   Profile
//                 </button>
//                 <button onClick={handleLogout}>Logout</button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }

//   /** ==========================
//    *  ✅ DESKTOP NAVBAR ✅
//    ============================ */
//   return (
//     <>
//       <nav className="navbar">
//         {/* Left Section: Logo */}
//         <div className="navbar-left">
//           <Link to="/" className="navbar-logo">
//             <span className="logo-name">Dr THANKYOU</span>
//           </Link>
//         </div>

//         {/* Middle Section: Navigation Links */}
//         <div className="navbar-middle">
//           <Link to="/" className="navbar-link">
//             HOME
//           </Link>
//           <Link to="/alldoctors" className="navbar-link">
//             DOCTORS
//           </Link>
//           <Link to="/medicalform" className="navbar-link">
//             MedAi
//           </Link>
//           <Link to="/about" className="navbar-link">
//             ABOUT
//           </Link>
//           <Link to="/contact" className="navbar-link">
//             CONTACT
//           </Link>
//           {role === "doctor" && (
//             <Link to="/doctordashboard" className="navbar-link">
//               Dashboard
//             </Link>
//           )}
//           {role === "user" && (
//             <Link to="/myappointments" className="navbar-link">
//               My Appointments
//             </Link>
//           )}
//         </div>

//         {/* Right Section: User Profile or Signup Button */}
//         <div className="navbar-right">
//           {user ? (
//             <div className="navbar-dropdown">
//               {role === "doctor" ? (
//                 <FaUserDoctor size={35} onClick={() => setDropdown(!dropdown)}a />
//               ) : (
//                 <FaUserCheck size={35} onClick={() => setDropdown(!dropdown)} />
//               )}
//               {dropdown && (
//                 <div className="dropdown-menu">
//                   <Link
//                     to={role === "doctor" ? "/profiledoctor" : "/profile"}
//                     className="dropdown-item"
//                   >
//                     My Profile
//                   </Link>
//                   <button className="dropdown-item" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link to="/signup" className="navbar-button">
//               Create Account
//             </Link>
//           )}
//         </div>
//       </nav>
//       <hr />
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { FaUserDoctor, FaStethoscope, FaUserCheck } from "react-icons/fa6";
import { FaEllipsisV, FaHome } from "react-icons/fa";
import "./Navbar/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dropdown, setDropdown] = useState(false);
  const [moreDropdown, setMoreDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsAdmin(user.email === "doctorthankyou2006@gmail.com"); // Check if the user is Admin

        try {
          const doctorDoc = await getDoc(doc(db, "doctors", user.uid));
          setRole(doctorDoc.exists() ? "doctor" : "user");
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
        setIsAdmin(false);
      }
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setDropdown(false);
      setMoreDropdown(false);
      
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar-dropdown, .more-dropdown-container")) {
        setDropdown(false);
        setMoreDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /** ==========================
   *  ✅ MOBILE BOTTOM NAVBAR ✅
   ============================ */
  if (isMobile) {
    return (
      <div className="bottom-nav">
        <button onClick={() => navigate("/")}>
          <FaHome size={22} />
          <span>Home</span>
        </button>
        <button onClick={() => navigate("/alldoctors")}>
          <FaUserDoctor size={22} />
          <span>Doctors</span>
        </button>
        <button onClick={() => navigate("/medicalform")}>
          <FaStethoscope size={22} />
          <span>MedAi</span>
        </button>
        <button
          onClick={() => setMoreDropdown(!moreDropdown)}
          className="more-dropdown-container"
        >
          <FaEllipsisV size={22} />
          <span>More</span>
        </button>

        {moreDropdown && (
          <div className="more-dropdown">
            {role === "user" && (
              <button onClick={() => navigate("/myappointments")}>
                My Appointments
              </button>
            )}
            {role === "doctor" && (
              <button onClick={() => navigate("/doctordashboard")}>
                Dashboard
              </button>
            )}
            {isAdmin && (
              <button onClick={() => navigate("/adminpannel")}>Admin</button>
            )}
            {user && (
              <>
                <button
                  onClick={() =>
                    navigate(role === "doctor" ? "/profiledoctor" : "/profile")
                  }
                >
                  Profile
                </button>
                <button onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }

  /** ==========================
   *  ✅ DESKTOP NAVBAR ✅
   ============================ */
  return (
    <>
      <nav className="navbar">
        {/* Left Section: Logo */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-name">Dr THANKYOU</span>
          </Link>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="navbar-middle">
          <Link to="/" className="navbar-link">
            HOME
          </Link>
          <Link to="/alldoctors" className="navbar-link">
            DOCTORS
          </Link>
          <Link to="/medicalform" className="navbar-link">
            MedAi
          </Link>
          <Link to="/about" className="navbar-link">
            ABOUT
          </Link>
          <Link to="/contact" className="navbar-link">
            CONTACT
          </Link>
          {role === "doctor" && (
            <Link to="/doctordashboard" className="navbar-link">
              Dashboard
            </Link>
          )}
          {role === "user" && (
            <Link to="/myappointments" className="navbar-link">
              My Appointments
            </Link>
          )}
          {isAdmin && (
            <Link to="/adminpannel" className="navbar-link">
              Admin
            </Link>
          )}
        </div>

        {/* Right Section: User Profile or Signup Button */}
        <div className="navbar-right">
          {user ? (
            <div className="navbar-dropdown">
              {role === "doctor" ? (
                <FaUserDoctor size={35} onClick={() => setDropdown(!dropdown)} />
              ) : (
                <FaUserCheck size={35} onClick={() => setDropdown(!dropdown)} />
              )}
              {dropdown && (
                <div className="dropdown-menu">
                  <Link
                    to={role === "doctor" ? "/profiledoctor" : "/profile"}
                    className="dropdown-item"
                  >
                    My Profile
                  </Link>
                  {isAdmin && (
                    <Link to="/adminpannel" className="dropdown-item">
                      Admin
                    </Link>
                  )}
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup" className="navbar-button">
              Create Account
            </Link>
          )}
        </div>
      </nav>
      <hr />
    </>
  );
};

export default Navbar;
