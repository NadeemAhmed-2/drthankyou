import React, { useEffect, useState } from "react";
import hero from "../assets/than1.jpg";
import hero2 from "../assets/hero2.jpg";
import tank from "../assets/than1.mobile.jpg";
import "./HeroComponent.css";

import { Button } from "bootstrap";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const HeroComponent = ({ flag }) => {
  const [ismobile, setismobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 468) setismobile(true);
  }, []);
  const [user, setUser] = useState(false);
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
    }
  });
  const nav = useNavigate();
  return (
    <div className="hero">
      <img
        src={flag ? (ismobile ? tank : hero) : (ismobile ? hero2 : hero2)}
        alt=""
        className="hero-image"
      />
      
        {/* <button
          className="btn"
          onClick={() => nav("/doctor-signup")}
          style={{ position: "absolute",fontSize:"0.8rem", bottom: "-275vh", left: "12vw" }}
        >
          Create an account
        </button> */}
      
      {/* {!flag && (
        <button className="btn" style={{position:"absolute",bottom:"0vh"}}>Create Account ? </button>
      )} */}
    </div>
  );
};

export default HeroComponent;
