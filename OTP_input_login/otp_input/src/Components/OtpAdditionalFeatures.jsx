import React, { useEffect, useRef, useState } from "react";

// ------------------------------------
// CONFIG
// ------------------------------------
const OTP_DIGITS_COUNT = 6;
const CORRECT_OTP = "123456"; // fake backend OTP

const OtpAdditionalFeatures = () => {
  // ------------------------------------
  // STATE: stores each digit
  // ------------------------------------
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );

  // UI states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  // success popup modal
const [showSuccessModal, setShowSuccessModal] = useState(false);


  // resend timer
  const [timer, setTimer] = useState(30);

  // refs to inputs
  const refArr = useRef([]);

  // ------------------------------------
  // AUTO FOCUS FIRST INPUT ON MOUNT
  // ------------------------------------
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  // ------------------------------------
  // TIMER COUNTDOWN FOR RESEND
  // ------------------------------------
 useEffect(() => {
  if (timer === 0 || showSuccessModal) return;

  const interval = setInterval(() => {
    setTimer((t) => t - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [timer, showSuccessModal]);

  // join digits into OTP string
  const otpValue = inputArr.join("");

  // ------------------------------------
  // HANDLE DIGIT INPUT
  // ------------------------------------
  const handleOnChange = (value, index) => {
    if (submitted) return;

    // ignore letters
    if (isNaN(value)) return;

    const newArr = [...inputArr];
    newArr[index] = value.slice(-1);
    setInputArr(newArr);

    // move focus next
    if (value && index < OTP_DIGITS_COUNT - 1) {
      refArr.current[index + 1]?.focus();
    }

    // auto submit if all filled
    if (newArr.every((v) => v !== "")) {
      handleSubmit(newArr.join(""));
    }
  };

  // ------------------------------------
  // BACKSPACE NAVIGATION
  // ------------------------------------
  const handleOnKeyDown = (e, index) => {
    if (submitted) return;

    // move to previous box if current empty
    if (e.key === "Backspace" && !inputArr[index] && index > 0) {
      refArr.current[index - 1]?.focus();
    }
  };

  // ------------------------------------
  // HANDLE FULL OTP PASTE
  // ------------------------------------
  const handlePaste = (e) => {
    if (submitted) return;

    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_DIGITS_COUNT)
      .split("");

    if (!pasted.length) return;

    const newArr = new Array(OTP_DIGITS_COUNT).fill("");
    pasted.forEach((d, i) => (newArr[i] = d));

    setInputArr(newArr);

    // auto submit after paste
    if (pasted.length === OTP_DIGITS_COUNT) {
      handleSubmit(pasted.join(""));
    }
  };


  // ------------------------------------
  // SUBMIT OTP
  // ------------------------------------
  const handleSubmit = (otp) => {
  setSubmitted(true);
  setError("");
  setSuccess("");

  setTimeout(() => {
    if (otp === CORRECT_OTP) {
      setSuccess("OTP Verified ✅");
      setInputArr(new Array(OTP_DIGITS_COUNT).fill(""));
      setShowSuccessModal(true);
    } else {
      setError("Invalid OTP ❌");

      setTimeout(() => {
        setInputArr(new Array(OTP_DIGITS_COUNT).fill(""));
        setError("");
        setSubmitted(false);
        refArr.current[0]?.focus();
      }, 800);
    }
  }, 1000);
};


  // ------------------------------------
  // RESEND OTP
  // ------------------------------------
  const handleResend = () => {
    if (timer > 0) return;

    setTimer(30);
    setInputArr(new Array(OTP_DIGITS_COUNT).fill(""));
    setSubmitted(false);
    setError("");
    setSuccess("");

    refArr.current[0]?.focus();
  };

 


  // ------------------------------------
  // UI
  // ------------------------------------
  return (
    <div className="otp-container">
      <h2 className="head">Validate OTP</h2>

      {/* OTP INPUTS */}
      <div
        className={`otp-generator ${error ? "shake" : ""}`}
        onPaste={handlePaste}
      >
        {inputArr.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            disabled={submitted}
            className="otp-input"
            value={digit}
            ref={(el) => (refArr.current[index] = el)}
            onChange={(e) =>
              handleOnChange(e.target.value, index)
            }
            onKeyDown={(e) =>
              handleOnKeyDown(e, index)
            }
          />
        ))}
      </div>

      {/* ERROR / SUCCESS MESSAGE */}
      {error && <p className="text-red-600 mt-3">{error}</p>}
      {success && <p className="text-green-600 mt-3">{success}</p>}

      {/* RESEND TIMER */}
      <div className="mt-4">
        {timer > 0 ? (
          <p className="text-gray-600">
            Resend OTP in {timer}s
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="resend-btn"
          >
            Resend OTP
          </button>
        )}
      </div>
{/* SUCCESS POPUP MODAL */}
{showSuccessModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3 className="text-2xl font-bold text-green-600">
        OTP Verified 🎉
      </h3>

      <p className="mt-3 text-gray-600">
        Your number has been successfully verified.
      </p>

      <button
        onClick={() => {
          setShowSuccessModal(false);
          setSubmitted(false);
          refArr.current[0]?.focus();
        }}
        className="modal-btn"
      >
        Continue
      </button>
    </div>
  </div>
)}


       </div>
  );
};

export default OtpAdditionalFeatures;
