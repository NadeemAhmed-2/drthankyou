import React, { useEffect } from "react";
import "./Contact.css";
import contactImage from "../../assets/contact.jpg";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Contact = () => {

  const nav = useNavigate()
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1>
          CONTACT <span>US</span>
        </h1>
        <div className="contact-content">
          <div className="contact-image">
            <img src={contactImage} alt="Doctor and patient" />
          </div>
          <div className="contact-info">
            <h3>OUR OFFICE</h3>
            <p>
              Yamnempet <br />  Hyderabad, Gatkesar
            </p>
            <p>
              <strong>Tel:</strong> 7013725762
            </p>
            <p>
              <strong>Email:</strong> doctorthankyou2006@gmail.com
            </p>

            <h3>CAREERS AT Dr THANKYOU</h3>
            <p>Explore more about our features.</p>
            <button onClick={() => nav("/")} className="explore-btn">Visit our Website</button>
          </div>
        </div>
      </div><br /><br />

      <Footer />
    </>
  );
};

export default Contact;
