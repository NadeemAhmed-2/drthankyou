

// // import React, { useState, useEffect } from "react";
// // import { Stethoscope, AlertCircle } from "lucide-react";
// // import "./Severity.css";
// // import img from "../../assets/medicalform.jpg";

// // function MedicalForm() {
// //   const [symptom, setSymptom] = useState("");
// //   const [severity, setSeverity] = useState("normal");
// //   const [chronicConditions, setChronicConditions] = useState("no");
// //   const [previousSymptoms, setPreviousSymptoms] = useState("no");
// //   const [severityText, setSeverityText] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [geminiResponse, setGeminiResponse] = useState("");
// //   const [displayedText, setDisplayedText] = useState("");
// //   const [language, setLanguage] = useState("english");

// //   useEffect(() => {
// //     let index = 0;
// //     if (geminiResponse) {
// //       setDisplayedText("");
// //       const interval = setInterval(() => {
// //         if (index < geminiResponse.length) {
// //           setDisplayedText((prev) => prev + geminiResponse[index]);
// //           index++;
// //         } else {
// //           clearInterval(interval);
// //         }
// //       }, 30);
// //       return () => clearInterval(interval);
// //     }
// //   }, [geminiResponse]);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     let recommendation = "";
// //     if (severity === "normal") {
// //       recommendation =
// //         "Based on your symptoms, here are some general recommendations:\n\n" +
// //         "- Take rest and stay hydrated\n" +
// //         "- Monitor your symptoms\n" +
// //         "- Consider over-the-counter medication if needed\n\n" +
// //         "Please consult a healthcare provider if symptoms worsen.";
// //     } else if (severity === "moderate") {
// //       recommendation =
// //         "Given the moderate severity of your symptoms:\n\n" +
// //         "- Schedule a video consultation with a healthcare provider\n" +
// //         "- Keep track of your symptoms and their progression\n" +
// //         "- Avoid self-medication\n\n" +
// //         "Our team will contact you shortly to arrange a consultation.";
// //     } else {
// //       recommendation =
// //         "URGENT MEDICAL ATTENTION REQUIRED\n\n" +
// //         "Based on the high severity of your symptoms:\n" +
// //         "- Please seek immediate medical care\n" +
// //         "- Contact emergency services if needed\n" +
// //         "- Do not delay getting professional help\n\n" +
// //         "We are notifying our medical team of your condition.";
// //     }

// //     try {
// //       setGeminiResponse(recommendation);
// //       setSeverityText(severity);
// //     } catch (err) {
// //       setError(
// //         "An error occurred while processing your request. Please try again."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getSeverityClass = (severityLevel) => {
// //     switch (severityLevel) {
// //       case "normal":
// //         return "severity-normal";
// //       case "moderate":
// //         return "severity-moderate";
// //       case "high":
// //         return "severity-high";
// //       default:
// //         return "";
// //     }
// //   };

// //   return (
// //     <div className="container">
// //       <div className="content">
// //         <div className="grid">
// //           <div className="image-section">
// //             <div className="image-container">
// //               <img
// //                 src={img}
// //                 alt="Medical AI Assistant"
// //                 className="medical-image"
// //               />
// //               <div className="image-overlay"></div>
// //             </div>
// //           </div>
// //           {/* <div className="image-section">
// //             <div className="image-container">
// //               <img
// //                 src={img}
// //                 alt="Medical AI Assistant"
// //                 className="medical-image"
// //               />
// //               <div className="image-overlay"></div>
// //             </div>
// //           </div> */}

// //           <div className="form-section">
// //             <div className="form-container">
// //               <div className="form-header">
// //                 <Stethoscope className="header-icon" size={32} />
// //                 <h1 className="form-title">Medical Bot</h1>
// //               </div>

// //               <form onSubmit={handleSubmit} className="form">
// //                 <div className="form-grid">
// //                   <div className="form-group">
// //                     <label htmlFor="symptom" className="form-label">
// //                       Symptoms
// //                     </label>
// //                     <input
// //                       type="text"
// //                       id="symptom"
// //                       value={symptom}
// //                       onChange={(e) => setSymptom(e.target.value)}
// //                       className="form-input"
// //                       placeholder="Describe your symptoms"
// //                       required
// //                     />
// //                   </div>

// //                   <div className="form-group">
// //                     <label htmlFor="severity" className="form-label">
// //                       Severity
// //                     </label>
// //                     <select
// //                       id="severity"
// //                       value={severity}
// //                       onChange={(e) => setSeverity(e.target.value)}
// //                       className="form-select"
// //                     >
// //                       <option value="normal">Normal</option>
// //                       <option value="moderate">Moderate</option>
// //                       <option value="high">High</option>
// //                     </select>
// //                   </div>

// //                   <div className="form-group">
// //                     <label htmlFor="chronicConditions" className="form-label">
// //                       Chronic Conditions
// //                     </label>
// //                     <select
// //                       id="chronicConditions"
// //                       value={chronicConditions}
// //                       onChange={(e) => setChronicConditions(e.target.value)}
// //                       className="form-select"
// //                     >
// //                       <option value="no">No</option>
// //                       <option value="yes">Yes</option>
// //                     </select>
// //                   </div>

// //                   <div className="form-group">
// //                     <label htmlFor="previousSymptoms" className="form-label">
// //                       Previous Symptoms
// //                     </label>
// //                     <select
// //                       id="previousSymptoms"
// //                       value={previousSymptoms}
// //                       onChange={(e) => setPreviousSymptoms(e.target.value)}
// //                       className="form-select"
// //                     >
// //                       <option value="no">No</option>
// //                       <option value="yes">Yes</option>
// //                     </select>
// //                   </div>

// //                   <div className="form-group">
// //                     <label htmlFor="language" className="form-label">
// //                       Language
// //                     </label>
// //                     <select
// //                       id="language"
// //                       value={language}
// //                       onChange={(e) => setLanguage(e.target.value)}
// //                       className="form-select"
// //                     >
// //                       <option value="english">English</option>
// //                       <option value="hindi">Hindi</option>
// //                       <option value="telugu">Telugu</option>
// //                       <option value="kannada">Kannada</option>
// //                       <option value="tamil">Tamil</option>
// //                     </select>
// //                   </div>

// //                   <div className="form-group" style={{ gridColumn: "1 / -1" }}>
// //                     <div
// //                       className={`severity-indicator ${getSeverityClass(
// //                         severity
// //                       )}`}
// //                     >
// //                       <AlertCircle size={20} />
// //                       <span>
// //                         Severity Level:{" "}
// //                         {severity.charAt(0).toUpperCase() + severity.slice(1)}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <button onSubmit={handleSubmit}
// //                   type="submit"
// //                   disabled={loading}
// //                   className="submit-button"
// //                 >
// //                   {loading ? "Processing..." : "Get Recommendation"}
// //                 </button>
// //               </form>

// //               {error && (
// //                 <div className="error-message">
// //                   <AlertCircle size={20} />
// //                   <p>{error}</p>
// //                 </div>
// //               )}

// //               {displayedText && (
// //                 <div className="response-section">
// //                   <h4 className="response-title">Recommendation</h4>
// //                   <div className="response-content">{displayedText}</div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //           {/* <div className="image-section">
// //             <div className="image-container">
// //               <img
// //                 src={img}
// //                 alt="Medical AI Assistant"
// //                 className="medical-image"
// //               />
// //               <div className="image-overlay"></div>
// //             </div>
// //           </div> */}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default MedicalForm;




// import React, { useState, useEffect } from "react";
// import { Stethoscope, AlertCircle } from "lucide-react";
// import "./Severity.css";
// import img from "../../assets/medicalform.jpg";
// import run from "../firebaseGemini";
// function MedicalForm() {
//   const [symptom, setSymptom] = useState("");
//   const [severity, setSeverity] = useState("normal");
//   const [chronicConditions, setChronicConditions] = useState("no");
//   const [previousSymptoms, setPreviousSymptoms] = useState("no");
//   const [severityText, setSeverityText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [geminiResponse, setGeminiResponse] = useState("");
//   const [displayedText, setDisplayedText] = useState("");
//   const [language, setLanguage] = useState("english");

//   useEffect(() => {
//     let index = 0;
//     if (geminiResponse) {
//       setDisplayedText("");
//       const interval = setInterval(() => {
//         if (index < geminiResponse.length) {
//           setDisplayedText((prev) => prev + geminiResponse[index]);
//           index++;
//         } else {
//           clearInterval(interval);
//         }
//       }, 30);
//       return () => clearInterval(interval);
//     }
//   }, [geminiResponse]);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault(); // Prevent the default form submission
//   //   setLoading(true);
//   //   setError(""); 

//   //   let recommendation = "";
//   //   if (severity === "normal") {
//   //     recommendation =
//   //       "Based on your symptoms, here are some general recommendations:\n\n" +
//   //       "- Take rest and stay hydrated\n" +
//   //       "- Monitor your symptoms\n" +
//   //       "- Consider over-the-counter medication if needed\n\n" +
//   //       "Please consult a healthcare provider if symptoms worsen.";
//   //   } else if (severity === "moderate") {
//   //     recommendation =
//   //       "Given the moderate severity of your symptoms:\n\n" +
//   //       "- Schedule a video consultation with a healthcare provider\n" +
//   //       "- Keep track of your symptoms and their progression\n" +
//   //       "- Avoid self-medication\n\n" +
//   //       "Our team will contact you shortly to arrange a consultation.";
//   //   } else {
//   //     recommendation =
//   //       "URGENT MEDICAL ATTENTION REQUIRED\n\n" +
//   //       "Based on the high severity of your symptoms:\n" +
//   //       "- Please seek immediate medical care\n" +
//   //       "- Contact emergency services if needed\n" +
//   //       "- Do not delay getting professional help\n\n" +
//   //       "We are notifying our medical team of your condition.";
//   //   }

//   //   try {
//   //     setGeminiResponse(recommendation);
//   //     setSeverityText(severity);
//   //   } catch (err) {
//   //     setError(
//   //       "An error occurred while processing your request. Please try again."
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission
//     setLoading(true);
//     setError(""); 
  
//     let recommendation = "";
  
//     try {
//       // Determine recommendation based on severity
//       if (severity === "normal") {
//         recommendation =
//           "Based on your symptoms, here are some general recommendations:\n\n" +
//           "Medicines: Paracetamol, Ibuprofen\n" +
//           "Foods to eat: Rice, Fruits, Soup\n" +
//           "Foods to avoid: Spicy foods, Fried foods\n\n" +
//           "Please consult a healthcare provider if symptoms worsen.";
//       } else if (severity === "moderate") {
//         recommendation =
//           "Given the moderate severity of your symptoms:\n\n" +
//           "- Schedule a video consultation with a healthcare provider\n" +
//           "- Specialist: General Physician, Pulmonologist\n" +
//           "- Keep track of your symptoms and their progression\n\n" +
//           "Our team will contact you shortly to arrange a consultation.";
//       } else {
//         recommendation =
//           "URGENT MEDICAL ATTENTION REQUIRED\n\n" +
//           "Based on the high severity of your symptoms:\n" +
//           "- Please seek immediate medical care\n" +
//           "- Contact emergency services if needed\n" +
//           "- Do not delay getting professional help\n\n" +
//           "We are notifying our medical team of your condition.";
//       }
  
//       // Call run method with the recommendation text
//       const res = await run("What is your name?");
  
//       setGeminiResponse(recommendation);
//       setSeverityText(res);
//     } catch (err) {
//       setError(
//         "An error occurred while processing your request. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const getSeverityClass = (severityLevel) => {
//     switch (severityLevel) {
//       case "normal":
//         return "severity-normal";
//       case "moderate":
//         return "severity-moderate";
//       case "high":
//         return "severity-high";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="container">
//       <div className="content">
//         <div className="grid">
//           <div className="image-section">
//             <div className="image-container">
//               <img
//                 src={img}
//                 alt="Medical AI Assistant"
//                 className="medical-image"
//               />
//               <div className="image-overlay"></div>
//             </div>
//           </div>

//           <div className="form-section">
//             <div className="form-container">
//               <div className="form-header">
//                 <Stethoscope className="header-icon" size={32} />
//                 <h1 className="form-title">Medical Bot</h1>
//               </div>

//               <form onSubmit={handleSubmit} className="form">
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label htmlFor="symptom" className="form-label">
//                       Symptoms
//                     </label>
//                     <input
//                       type="text"
//                       id="symptom"
//                       value={symptom}
//                       onChange={(e) => setSymptom(e.target.value)}
//                       className="form-input"
//                       placeholder="Describe your symptoms"
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="severity" className="form-label">
//                       Severity
//                     </label>
//                     <select
//                       id="severity"
//                       value={severity}
//                       onChange={(e) => setSeverity(e.target.value)}
//                       className="form-select"
//                     >
//                       <option value="normal">Normal</option>
//                       <option value="moderate">Moderate</option>
//                       <option value="high">High</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="chronicConditions" className="form-label">
//                       Chronic Conditions
//                     </label>
//                     <select
//                       id="chronicConditions"
//                       value={chronicConditions}
//                       onChange={(e) => setChronicConditions(e.target.value)}
//                       className="form-select"
//                     >
//                       <option value="no">No</option>
//                       <option value="yes">Yes</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="previousSymptoms" className="form-label">
//                       Previous Symptoms
//                     </label>
//                     <select
//                       id="previousSymptoms"
//                       value={previousSymptoms}
//                       onChange={(e) => setPreviousSymptoms(e.target.value)}
//                       className="form-select"
//                     >
//                       <option value="no">No</option>
//                       <option value="yes">Yes</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="language" className="form-label">
//                       Language
//                     </label>
//                     <select
//                       id="language"
//                       value={language}
//                       onChange={(e) => setLanguage(e.target.value)}
//                       className="form-select"
//                     >
//                       <option value="english">English</option>
//                       <option value="hindi">Hindi</option>
//                       <option value="telugu">Telugu</option>
//                       <option value="kannada">Kannada</option>
//                       <option value="tamil">Tamil</option>
//                     </select>
//                   </div>

//                   <div className="form-group" style={{ gridColumn: "1 / -1" }}>
//                     <div
//                       className={`severity-indicator ${getSeverityClass(
//                         severity
//                       )}`}
//                     >
//                       <AlertCircle size={20} />
//                       <span>
//                         Severity Level:{" "}
//                         {severity.charAt(0).toUpperCase() + severity.slice(1)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="submit-button"
//                 >
//                   {loading ? "Processing..." : "Get Recommendation"}
//                 </button>
//               </form>

//               {error && (
//                 <div className="error-message">
//                   <AlertCircle size={20} />
//                   <p>{error}</p>
//                 </div>
//               )}

//               {displayedText && (
//                 <div className="response-section">
//                   <h4 className="response-title">Recommendation</h4>
//                   <div className="response-content">{displayedText}</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MedicalForm;






import React, { useState, useEffect } from "react";
import run from "../firebaseGemini"; // Ensure this function correctly fetches responses from Gemini
import "./Severity.css" ;

const MedicalForm = () => {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("normal");
  const [chronicConditions, setChronicConditions] = useState("no");
  const [previousSymptoms, setPreviousSymptoms] = useState("no");
  const [severityText, setSeverityText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [geminiResponse, setGeminiResponse] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [language, setLanguage] = useState("english");
  const [keyPoints, setKeyPoints] = useState([]);
 useEffect(()=>{
   window.scrollTo(0,0)
 },[])
  useEffect(() => {
    
    let index = 0;
    if (geminiResponse) {
      setDisplayedText("");
      const interval = setInterval(() => {
        if (index < geminiResponse.length) {
          setDisplayedText((prev) => prev + geminiResponse[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [geminiResponse]);

  const handleSubmitGemini = async (e) => {
    e.preventDefault();

    let recommendation = "";

    if (severity === "normal") {
      recommendation = "Suggest only medicine names, food to take, and food to avoid.";
    } else if (severity === "moderate") {
      recommendation = "Consult a video call with a specialist doctor (specialist name available on our website).";
    } else if (severity === "high") {
      recommendation = "Urgency to meet the doctor, specialist name available.";
    }

    setSeverityText(severity);
    setLoading(true);
    setError("");
    setGeminiResponse("");
    setDisplayedText("");
    setKeyPoints([]);

    try {
      const prompt = `
        Patient Information:
        - Symptom: ${symptom}
        - Severity: ${severity}
        - Chronic Conditions: ${chronicConditions === "yes" ? "Yes" : "No"}
        - Previous Symptoms: ${previousSymptoms === "yes" ? "Yes" : "No"}

        Severity: ${severity}

        Based on the severity:
        - If severity is "normal", suggest only medicine names, food to take, and food to avoid.
        - If severity is "moderate", recommend a video call with a specialist doctor.
        - If severity is "high", recommend urgent consultation with a doctor.

        Respond in ${language} language.
        When providing medicines, please list only the medicine names.
        When providing food suggestions, please list only the food names.
      `;

      const res = await run(prompt);
      setGeminiResponse(res);
      extractKeyPoints(res);
    } catch (error) {
      setError("Error fetching response from Gemini. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractKeyPoints = (response) => {
    const points = [];

    if (response) {
      const lines = response.split("\n");

      lines.forEach((line) => {
        if (line.toLowerCase().includes("recommend") || line.toLowerCase().includes("severity")) {
          points.push(line.trim());
        }
      });

      setKeyPoints(points);
    }
  };

  return (
    <div className="main-div medical-form-container" style={{ margin: "0 auto", padding: "20px" }}>
      <h2>Medical Bot</h2>
      <form onSubmit={handleSubmitGemini}>
        <div className="sym">
          <label htmlFor="symptom">Symptom:</label>
          <input
          style={{width:"95a%"}}
            type="text"
            id="symptom"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="severity">Severity:</label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required
          >
            <option value="normal">Normal</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          {/* <label>Severity Level: </label> */}
          <strong>{severityText}</strong>
        </div>
        {/* <div>
          <label htmlFor="chronicConditions">Chronic Conditions:</label>
          <select
            id="chronicConditions"
            value={chronicConditions}
            onChange={(e) => setChronicConditions(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <div>
          <label htmlFor="previousSymptoms">Previous Symptoms:</label>
          <select
            id="previousSymptoms"
            value={previousSymptoms}
            onChange={(e) => setPreviousSymptoms(e.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <label htmlFor="language">Choose Language:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="telugu">Telugu</option>
            <option value="kannada">Kannada</option>
            <option value="tamil">Tamil</option>
          </select>
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Assistance"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
        
          padding: "10px",
          borderRadius: "8px",
          marginTop: "20px",
          backgroundColor: "#f9f9f9",
          height: "200px",
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      >
        {loading ? "Processing..." : displayedText}
      </div>
    </div>
  );
};

export default MedicalForm;





