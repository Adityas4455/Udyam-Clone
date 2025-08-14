import { useState } from "react";

type Step = 1 | 2;

export default function TwoStepForm() {
  const [step, setStep] = useState<Step>(1);

  // Step 1 state
  const [aadhaar, setAadhaar] = useState("");
  const [aadhaarName, setAadhaarName] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [step1Error, setStep1Error] = useState<string>("");

  // Step 2 state
  const [pan, setPan] = useState("");
  const [panName, setPanName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [panValidated, setPanValidated] = useState(false);
  const [step2Error, setStep2Error] = useState<string>("");

  const aadhaarPattern = /^\d{12}$/;
  const otpPattern = /^\d{6}$/;
  const panPattern = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
  const mobilePattern = /^[6-9]\d{9}$/;

  const sendOtp = () => {
    if (!aadhaarPattern.test(aadhaar)) {
      setStep1Error("Enter a valid 12-digit Aadhaar number.");
      return;
    }
    if (!aadhaarName.trim()) {
      setStep1Error("Enter name as per Aadhaar.");
      return;
    }
    setStep1Error("");
    setOtpSent(true);
  };

  const verifyAadhaar = () => {
    if (!otpPattern.test(otp)) {
      setStep1Error("Enter the 6-digit OTP.");
      return;
    }
    setStep1Error("");
    setStep(2);
  };

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
  };

  return (
    <div className="w-full">
      {/* Step indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className={`h-2 w-24 rounded-l-full ${step >= 1 ? "bg-indigo-600" : "bg-gray-200"}`} />
        <div className={`h-2 w-24 ${step === 2 ? "bg-indigo-600" : "bg-gray-200"}`} />
        <div className={`h-2 w-24 rounded-r-full ${step === 2 ? "bg-indigo-600" : "bg-gray-200"}`} />
      </div>

      {step === 1 && (
        <section aria-label="Aadhaar Verification" className="space-y-4">
          <h2 className="text-xl font-semibold">Aadhaar Verification With OTP</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Aadhaar Number / आधार संख्या</label>
            <input
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
              maxLength={12}
              placeholder="Enter 12-digit Aadhaar"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name of Entrepreneur / उद्यमी का नाम</label>
            <input
              value={aadhaarName}
              onChange={(e) => setAadhaarName(e.target.value)}
              placeholder="Name as per Aadhaar"
              className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {otpSent && (
            <div>
              <label className="block text-sm font-medium mb-1">OTP</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {step1Error && <p className="text-sm text-red-600">{step1Error}</p>}

          <div className="flex items-center gap-3 pt-2">
            {!otpSent ? (
              <button
                onClick={sendOtp}
                className="rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
              >
                Send OTP
              </button>
            ) : (
              <button
                onClick={verifyAadhaar}
                className="rounded-md bg-green-600 text-white px-4 py-2 hover:bg-green-700"
              >
                Verify Aadhaar
              </button>
            )}
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-label="PAN Verification" className="space-y-4">
          <div className="rounded-md border">
            <div className="bg-green-600 text-white px-4 py-2 rounded-t-md font-medium">
              PAN Verification
            </div>

            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Type of Organisation / संगठन के प्रकार</label>
                  <select className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" defaultValue="Proprietorship" disabled={panValidated}>
                    <option>Proprietorship</option>
                    <option>Partnership</option>
                    <option>LLP</option>
                    <option>Pvt Ltd</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">PAN / पैन</label>
                  <input
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder="ABCDE1234F"
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={panValidated}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Name of PAN Holder / पैन धारक का नाम</label>
                  <input
                    value={panName}
                    onChange={(e) => setPanName(e.target.value)}
                    placeholder="Name as per PAN"
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={panValidated}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">DOB as per PAN / जन्म तिथि</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={panValidated}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Mobile Number / मोबाइल नंबर</label>
                  <input
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    maxLength={10}
                    placeholder="10-digit mobile"
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={panValidated}
                  />
                </div>
              </div>

              {step2Error && <p className="text-sm text-red-600">{step2Error}</p>}

              {!panValidated ? (
                <div className="pt-2">
                  <button
                    onClick={validatePan}
                    className="rounded-md bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
                  >
                    PAN Validate
                  </button>
                </div>
              ) : (
                <div className="rounded-md bg-green-50 border border-green-200 p-4">
                  <p className="text-green-700 font-medium">Your PAN has been successfully verified.</p>
                  <p className="text-sm text-green-700 mt-1">You can continue Udyam Registration process.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
