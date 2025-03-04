import React, { useEffect, useState } from "react";
import "./About.css";
import doctorImage from "../../assets/about.jpg" // Replace with your image
import Footer from "../Footer/Footer";
import Navbar from "../Navbar";

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const features = [
    {
      title: "EFFICIENCY:",
      text: "Streamlined appointment scheduling that fits into your busy lifestyle.",
    },
    {
      title: "CONVENIENCE:",
      text: "Access to a network of trusted healthcare professionals in your area.",
    },
    {
      title: "PERSONALIZATION:",
      text: "Tailored recommendations and reminders to help you stay on top of your health.",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="about-container">
        <section className="about-header">
          <h1>
            ABOUT <span>US</span>
          </h1>
          {/* <p>
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently.
          </p> */}
        </section>

        <section className="about-content">
          <div className="about-image">
            <img src={doctorImage} alt="Doctors" />
          </div>
          <div className="about-text">
            <p>
              DR THANKYOU Healthcare Platform is a comprehensive, AI-powered
              medical platform designed to bridge the gap between MBBS students
              (future doctors) and patients in need of medical consultation.
              This platform enables seamless doctor-patient interactions through
              video conferencing, offers the capability for patients to upload
              previous medical reports, and integrates advanced AI tools for
              disease prediction, severity assessment, and personalized
              medical recommendations
            </p>
            {/* <p>
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service.
            </p> */}
            <h3>Our Vision</h3>
            <p>
              At DR THANKYOU Healthcare Platform, our vision is to democratize
              healthcare by empowering future doctors and enhancing patient care
              through technology. We strive to create a seamless, AI-driven
              ecosystem where medical knowledge meets patient needs, fostering
              accessible, accurate, and personalized healthcare for everyone
            </p>
          </div>
        </section>

        <section className="why-choose-us">
          <h2>
            WHY <span>CHOOSE US</span>
          </h2>
          <div className="features">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-box ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
