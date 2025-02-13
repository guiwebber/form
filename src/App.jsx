import "./App.css";
import { useState, useEffect } from "react";
import checkSuccess from "./assets/images/icon-success-check.svg";
function CustomAlert({ message, onClose }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onClose, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`overlay ${fadeOut ? "fade-out" : ""}`}>
      <div className="alert-box">
        <p className="message-sent">
          {" "}
          <img className="iconSuccess" src={checkSuccess} alt="" /> Message Sent!
        </p>
        <p className="thanks-text">
          Thanks for completing the form. We'll be in touch soon!
        </p>
      </div>
    </div>
  );
}

function App() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [mail, setMail] = useState("");
  const [radio, setRadio] = useState("");
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState(""); // Estado para o modal

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!first) newErrors.first = "This field is required";
    if (!last) newErrors.last = "This field is required";
    if (!mail) newErrors.mail = "This field is required";
    if (!radio) newErrors.radio = "This field is required";
    if (!message) newErrors.message = "This field is required";
    if (!terms) newErrors.terms = "You must accept the terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setAlertMessage("Form submitted successfully! 🎉");
    }
  };

  return (
    <div className="container">
      <div className="containerContact">
        <h2>Contact Us</h2>
        <form className="form" onSubmit={handleSubmit}>
          {/* Campos do formulário */}
          <div className="flex">
            <div className="col w-45">
              <label className="labelDefault">First Name</label>
              <input
                type="text"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                className={errors.first ? "error" : "mbottom"}
              />
              {errors.first && <p className="errorText">{errors.first}</p>}
            </div>
            <div className="col w-45">
              <label className="labelDefault">Last Name</label>
              <input
                type="text"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                className={errors.last ? "error" : "mbottom"}
              />
              {errors.last && <p className="errorText">{errors.last}</p>}
            </div>
          </div>
          <div className="col">
            <label className="labelDefault">Email Address</label>
            <input
              type="text"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className={`w-90 ${errors.mail ? "error" : "mbottom"}`}
            />
            {errors.mail && <p className="errorText">{errors.mail}</p>}
          </div>
          <div>
            <label className="labelDefault">Query Type</label>
            <div className="divRadio flex">
              <div
                className="divRadioBtn w-45"
                onClick={() => setRadio("General Enquiry")}
              >
                <input
                  type="radio"
                  name="queryType"
                  id="generalEnquiry"
                  value="General Enquiry"
                  onChange={() => setRadio("General Enquiry")}
                />
                <label htmlFor="generalEnquiry" className="label">
                  General Enquiry
                </label>
              </div>
              <div
                className="divRadioBtn w-45"
                onClick={() => setRadio("Support Request")}
              >
                <input
                  type="radio"
                  id="supportRequest"
                  name="queryType"
                  value="Support Request"
                  checked={radio === "Support Request"}
                  onChange={() => setRadio("Support Request")}
                />
                <label htmlFor="supportRequest" className="label">
                  Support Request
                </label>
              </div>
            </div>
            {errors.radio && <p className="errorText">{errors.radio}</p>}
          </div>
          <div className="col divTextArea">
            <label className="labelDefault">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-90 ${errors.message ? "error" : "mbottom"}`}
            ></textarea>
            {errors.message && <p className="errorText">{errors.message}</p>}
          </div>
          <div className="divTerms">
            <input
              type="checkbox"
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label className="labelDefault">
              I consent to being contacted by the team
            </label>
          </div>
          {errors.terms && <p className="errorText">{errors.terms}</p>}
          <div className="divBtn">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>

      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage("")}
        />
      )}
    </div>
  );
}

export default App;
