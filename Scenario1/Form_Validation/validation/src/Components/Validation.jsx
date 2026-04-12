import React from "react";
import { useState } from "react";

const Validation = () => {

  // 📦 FORM DATA STATE (stores all input values)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [], // 👈 multiple checkbox values
    birthDate: "",
  });

  // ❌ ERROR STATE (stores validation errors)
  const [errors, setErrors] = useState({});


  // ======================================================
  // 🔄 HANDLE INPUT CHANGES
  // ======================================================
  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    // 🟢 If checkbox (special handling)
    if (type === "checkbox") {

      setFormData((prev) => ({
        ...prev,

        // ✅ Add or remove value from array
        interests: checked
          ? [...prev.interests, value] // add
          : prev.interests.filter((i) => i !== value), // remove
      }));

    } else {

      // 🟢 For normal inputs (text, email, etc.)
      setFormData((prev) => ({
        ...prev,
        [name]: value, // dynamic update
      }));
    }
  };


  // ======================================================
  // 🔍 VALIDATION FUNCTION
  // ======================================================
  const validate = () => {

    const newErrors = {};

    // 🧑 First Name
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    // 🧑 Last Name
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";

    // 📧 Email
    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    // 📞 Phone
    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter valid 10 digit number";

    // 🔐 Password
    if (!formData.password)
      newErrors.password = "Password is required";
    else if (!/(?=.*[!@#$%^&*])/.test(formData.password))
      newErrors.password =
        "Password must include at least one special character";
    else if (formData.password.length < 6)
      newErrors.password =
        "Password must be at least 6 characters";

    // 🔁 Confirm Password
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    // 🎂 Age
    if (!formData.age || formData.age < 18)
      newErrors.age = "Age must be 18+";

    // ⚧ Gender
    if (!formData.gender)
      newErrors.gender = "Select gender";

    // 📅 Birth Date
    if (!formData.birthDate)
      newErrors.birthDate = "Birth date required";

    // ❌ Set errors
    setErrors(newErrors);

    // ✅ Return true if no errors
    return Object.keys(newErrors).length === 0;
  };


  // ======================================================
  // 📤 HANDLE FORM SUBMIT
  // ======================================================
  const handleSubmit = (e) => {

    e.preventDefault(); // ❌ stop page reload

    // ✅ Validate form
    if (validate()) {

      console.log(formData);

      alert("Form submitted successfully ✅");

      // 🔄 RESET FORM AFTER SUBMIT
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interests: [],
        birthDate: "",
      });

      // 🔄 Clear errors
      setErrors({});
    }
  };


  return (
    <form onSubmit={handleSubmit} className="validation-form">

      <h2>Registration Form</h2>

      {/* 🧑 FIRST NAME */}
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      {errors.firstName && <p>{errors.firstName}</p>}


      {/* 🧑 LAST NAME */}
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      {errors.lastName && <p>{errors.lastName}</p>}


      {/* 📧 EMAIL */}
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p>{errors.email}</p>}


      {/* 📞 PHONE */}
      <input
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      {errors.phoneNumber && <p>{errors.phoneNumber}</p>}


      {/* 🔐 PASSWORD */}
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p>{errors.password}</p>}


      {/* 🔁 CONFIRM PASSWORD */}
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}


      {/* 🎂 AGE */}
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />
      {errors.age && <p>{errors.age}</p>}


      {/* ⚧ GENDER */}
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p>{errors.gender}</p>}


      {/* 📅 DATE */}
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
      />
      {errors.birthDate && <p>{errors.birthDate}</p>}


      {/* ☑️ CHECKBOXES */}
      <label>
        <input
          type="checkbox"
          value="coding"
          checked={formData.interests.includes("coding")}
          onChange={handleChange}
        />
        Coding
      </label>


      {/* 🚀 SUBMIT */}
      <button type="submit">Submit</button>

    </form>
  );
};
----------------------------------------------------------------------------------------------------------------------------------------
 🔄 Full Flow
User types input
      ↓
handleChange()
      ↓
formData updates
      ↓
User clicks submit
      ↓
validate()
      ↓
Errors OR Success
⚡ Important Concepts
✅ Controlled Components
value={formData.firstName}

👉 React controls input

✅ Dynamic Input Handling
[name]: value

👉 Works for all inputs

✅ Regex Validation
/^\S+@\S+\.\S+$/

👉 Checks email format

✅ Checkbox Array Handling
interests: [...prev.interests, value]

👉 Stores multiple values

🎤 Interview Answer

"This component implements a controlled form with validation using React state. It handles multiple input types, validates user input using conditions and regex, and displays errors dynamically." 

export default Validation;
