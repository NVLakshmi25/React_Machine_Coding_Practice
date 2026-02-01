import React, { useEffect, useRef, useState } from "react";

// TOTAL OTP LENGTH
const OTP_DIGITS_COUNT = 6;

const GenerateOTP = () => {
  // -----------------------------
  // STATE: stores each digit
  // Example: ["1","2","","","",""]
  // -----------------------------
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );

  // -----------------------------
  // REFS: keep reference to every input element
  // so we can programmatically focus them
  // -----------------------------
  const refArr = useRef([]);

  // -----------------------------
  // On mount -> focus first input box
  // -----------------------------
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  // -----------------------------
  // HANDLE INPUT CHANGE
  // Runs when user types in any box
  // -----------------------------
  const handleOnChange = (value, index) => {
    // ❌ ignore non-numbers
    if (isNaN(value)) return;

    // remove spaces
    const newValue = value.trim();

    // copy previous OTP array
    const newArr = [...inputArr];

    // keep ONLY last typed digit
    // prevents pasting multiple chars into one box
    newArr[index] = newValue.slice(-1);

    // update state
    setInputArr(newArr);

    // 👉 move cursor to next input if user typed something
    if (newValue && index < OTP_DIGITS_COUNT - 1) {
      refArr.current[index + 1]?.focus();
    }
  };

  // -----------------------------
  // HANDLE BACKSPACE NAVIGATION
  // -----------------------------
  const handleOnKeyDown = (e, index) => {
    // If current box is EMPTY and Backspace is pressed
    if (e.key === "Backspace" && !inputArr[index] && index > 0) {
      // move focus to previous box
      refArr.current[index - 1]?.focus();
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="otp-container">
      <div className="header text-center">
        <h1 className="head">Validate OTP</h1>

        <div className="otp-genarator">
          {inputArr.map((input, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric" // mobile numeric keypad
              maxLength={1} // allow only 1 char visually
              className="otp-input"
              value={input}
              ref={(el) => (refArr.current[index] = el)}

              // typing
              onChange={(e) =>
                handleOnChange(e.target.value, index)
              }

              // backspace behavior
              onKeyDown={(e) =>
                handleOnKeyDown(e, index)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenerateOTP;
