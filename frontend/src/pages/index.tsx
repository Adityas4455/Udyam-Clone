import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TwoStepForm from "./components/TwoStepForm";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Udyam Registration Clone
        </h1>
        <TwoStepForm />
      </div>
    </div>
  </React.StrictMode>
);
