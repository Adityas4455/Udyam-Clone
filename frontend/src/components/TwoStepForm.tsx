import React, { useState } from "react";

export default function TwoStepForm() {
  const [aadhaar, setAadhaar] = useState("");
  const [aadhaarName, setAadhaarName] = useState("");
  const [pan, setPan] = useState("");
  const [panName, setPanName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [step, setStep] = useState(1);
  const [step1Error, setStep1Error] = useState("");
  const [step2Error, setStep2Error] = useState("");
  const [panValidated, setPanValidated] = useState(false);

  const aadhaarPattern = /^\d{12}$/;
  const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const mobilePattern = /^[6-9]\d{9}$/;

  // Step 1 validation
  const validateAadhaar = () => {
    if (!aadhaarPattern.test(aadhaar)) {
      setStep1Error("Enter a valid 12-digit Aadhaar number.");
      return;
    }
    if (!aadhaarName.trim()) {
      setStep1Error("Enter name as per Aadhaar.");
      return;
    }
    setStep1Error("");
    setStep(2);
  };

  // Submit form data to backend
  const submitForm = async () => {
    try {
      const res = await fetch("https://udyam-clone-65x0.onrender.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          aadhaarNumber: aadhaar,
          applicantName: aadhaarName,
          mobile: mobile,
          pan: pan,
          panName: panName,
          dob: dob,
        }),
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      if (data.ok) {
        alert("Submission successful!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Submission failed", err);
      alert("Something went wrong!");
    }
  };

  // Step 2 validation
  const validatePan = () => {
    if (!panPattern.test(pan)) {
      setStep2Error("Enter a valid PAN number (e.g., ABCDE1234F).");
      return;
    }
    if (!panName.trim()) {
      setStep2Error("Enter name as per PAN.");
      return;
    }
    if (!mobilePattern.test(mobile)) {
      setStep2Error("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!dob) {
      setStep2Error("Select DOB.");
      return;
    }
    setStep2Error("");
    setPanValidated(true);

    // Call backend after validation
    submitForm();
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Aadhaar Details</h2>
          <input
            type="text"
            placeholder="Aadhaar Number"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name as per Aadhaar"
            value={aadhaarName}
            onChange={(e) => setAadhaarName(e.target.value)}
          />
          {step1Error && <p style={{ color: "red" }}>{step1Error}</p>}
          <button onClick={validateAadhaar}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: PAN & Contact Details</h2>
          <input
            type="text"
            placeholder="PAN Number"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
          />
          <input
            type="text"
            placeholder="Name as per PAN"
            value={panName}
            onChange={(e) => setPanName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          {step2Error && <p style={{ color: "red" }}>{step2Error}</p>}
          <button onClick={validatePan}>Submit</button>
        </div>
      )}
    </div>
  );
}
