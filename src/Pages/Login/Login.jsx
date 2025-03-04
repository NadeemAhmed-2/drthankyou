// // // import React, { useState } from "react";
// // // import { loginUser } from "../../firebase";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import "./Login.css"; // Import the CSS file

// // // const Login = () => {
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [name,setname] = useState("")
// // //   const navigate = useNavigate();

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     try {
// // //       await loginUser(email, password);
// // //       localStorage.setItem('name',name)
// // //       navigate("/");
// // //     } catch (err) {
// // //       setError(err.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container">
// // //       <h2 className="title">Login</h2>
// // //       {error && <p className="error">{error}</p>}
// // //       <form onSubmit={handleLogin} className="form">
// // //       <input
// // //           type="text"
// // //           placeholder="User name"
// // //           value={name}
// // //           onChange={(e) => setname(e.target.value)}
// // //           required
// // //           className="input"
// // //         />
// // //         <input
// // //           type="email"
// // //           placeholder="Email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //           required
// // //           className="input"
// // //         />
// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           required
// // //           className="input"
// // //         />
// // //         <button type="submit" className="button">
// // //           Login
// // //         </button>
// // //       </form>
// // //       <p style={{ marginTop: "10px" }}>
// // //         Don't have an account? <Link to="/signup">Create an account</Link>
// // //       </p>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // import React, { useState, useEffect } from "react";
// // import { loginUser } from "../../firebase";
// // import { Link, useNavigate } from "react-router-dom";
// // import { onAuthStateChanged } from "firebase/auth";
// // import { auth } from "../../firebase";
// // import "./Login.css"; // Import the CSS file

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const [name, setName] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Redirect to home page if the user is already logged in
// //     const unsubscribe = onAuthStateChanged(auth, (user) => {
// //       if (user) {
// //         navigate("/"); // Redirect to home page if the user is logged in
// //       }
// //     });

// //     return unsubscribe; // Clean up the subscription when the component unmounts
// //   }, [navigate]);

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await loginUser(email, password);
// //       localStorage.setItem("name", name);
// //       navigate("/"); // Redirect to home page after successful login
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   return (
   
// //     <div className="login-container">
// //     <div className="login-box">
// //       <h2>Login</h2>
// //       <input
// //           type="text"
// //           placeholder="User name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //           required
// //           className="input-field"
// //         />
// //       <input
// //         type="email"
// //         required
// //         placeholder="Email"
// //         value={email}
// //         onChange={(e) => setEmail(e.target.value)}
// //         className="input-field"
// //       />
// //       <input
// //         required
// //         type="password"
// //         placeholder="Password"
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //         className="input-field"
// //       />
// //       <button className="login-btn" onClick={handleLogin}>
// //         Login
// //       </button>
// //       <p className="signup-link">
// //         Don't have an account? <Link to="/signup">Sign Up</Link>
// //       </p>
// //     </div>
// //     {/* ToastContainer is used to display the toast notifications */}
// //     {/* <ToastContainer
// //       position="top-right"
// //       autoClose={3000} // Toast will auto-close after 3 seconds
// //       hideProgressBar
// //       newestOnTop
// //       closeOnClick
// //       rtl={false}
// //       pauseOnFocusLoss
// //       draggable
// //       pauseOnHover
// //     /> */}
// //   </div>
// //   );
// // };

// // export default Login;


// import React, { useState, useEffect } from "react";
// import { loginUser } from "../../firebase";
// import { Link, useNavigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         navigate("/");
//       }
//     });

//     return unsubscribe;
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await loginUser(email, password);
//       localStorage.setItem("name", name);
      
//       setTimeout(() => {
//       //  toast.success("Successfully logged in!");
//         navigate("/");
//         toast.success("Successfully logged in!");
//       },1000);
//     } catch (err) {
//       setError(err.message);
     
//       toast.error("Login failed! Check your credentials.", { autoClose: 2000 });
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="User name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="input-field"
//         />
//         <input
//           type="email"
//           required
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input-field"
//         />
//         <input
//           required
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input-field"
//         />
//         <button className="login-btn" onClick={handleLogin}>
//           Login
//         </button>
//         <p className="signup-link">
//           Don't have an account? <Link to="/signup">Sign Up</Link>
//         </p>
//       </div>
//       {/* Toast Container for notifications */}
//       <ToastContainer position="top-right" autoClose={2000} />
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { loginUser } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      localStorage.setItem("name", name);

      // Show success toast first
      toast.success("Successfully logged in!", { autoClose: 2000 });

      // After 2 seconds, navigate to home
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(err.message);
      toast.error("Login failed! Check your credentials.", { autoClose: 2000 });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="User name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="signup-link">
        Don't have an account? <Link to="/doctor-signup">Doctor Sign Up</Link>
        </p>
      </div>
      {/* Toast Container for notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Login;
