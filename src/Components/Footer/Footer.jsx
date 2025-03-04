import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const nav = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-brand">Dr THANKYOU</h2>
          <p>
            DR THANKYOU Healthcare Platform is an AI-powered medical platform
            connecting MBBS students (future doctors) with patients for seamless
            video consultations. 
          </p>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li onClick={() => nav("/")}>Home</li>
            <li onClick={() => nav("/about")}>About us</li>
            <li onClick={() => nav("/contact")}>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Get in Touch</h3>
          <p>+0-000-000-000</p>
          <p>drthankyou@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright 2024 @ Dr THANKYOU - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
