import React, { useEffect, useState } from "react";
import run from "../firebaseGemini";
import img from "../../assets/medicalBot.jpg";
import { useNavigate } from "react-router-dom";
import "./Ai.css";

const AiQueryComponent = () => {
  const [ismobile, setismobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 468) setismobile(true);
  }, []);

  const navigator = useNavigate();
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [geminiResponse, setGeminiResponse] = useState(""); // State for Gemini response

  const handleSubmitGemini = async () => {
    if (!query.trim()) {
      setError("Please enter a valid query.");
      return;
    }

    setLoading(true);
    setError("");
    setGeminiResponse(""); // Clear previous Gemini response

    try {
      const newQuery = `Iam experiencing ${query}. Which medical specialist will be more accurate to visit? give me the specilist name only.`;
      const res = await run(newQuery);
      setGeminiResponse(res); // Set the Gemini response
    } catch (error) {
      setError("Error fetching response from Gemini. Please try again later.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }

    setQuery(""); // Clear input field after submission
  };

  return (
    <div className="ai">
      {ismobile ? (
        <img className="d-img d-img-mobile" src={img} alt="Medical Bot" />
      ) : (
        <img className="d-img" src={img} alt="Medical Bot" />
      )}

      {/* Display Gemini Response */}
      {geminiResponse && (
        <div className="response-container">
          <h3>Gemini's Answer:</h3>
          <p>{geminiResponse}</p> {/* Display Gemini response in the p tag */}
        </div>
      )}

      <br />

      <button
        onClick={() => navigator("/medicalform")} // Call Gemini submit function
        disabled={loading}
        className="submit-button"
      >
        Chat With MedAssist
      </button>

      {/* Display error message */}
      {error && (
        <div className="error-message">
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default AiQueryComponent;
