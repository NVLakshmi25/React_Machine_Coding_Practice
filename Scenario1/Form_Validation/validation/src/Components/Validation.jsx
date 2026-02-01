import React from "react";
import  { useState } from "react";

const Validation = () => {
  const [formData, setFormData] = useState({
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

  const [errors, setErrors] = useState({});

  // ---------------- CHANGE HANDLER ----------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((i) => i !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";

    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";

    if (!formData.email)
      newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter valid 10 digit number";

    if (!formData.password)
  newErrors.password = "Password is required";
else if (
  !/(?=.*[!@#$%^&*])/.test(formData.password)
)
  newErrors.password =
    "Password must include at least one special character";
else if (formData.password.length < 6)
  newErrors.password =
    "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.age || formData.age < 18)
      newErrors.age = "Age must be 18+";

    if (!formData.gender)
      newErrors.gender = "Select gender";

    if (!formData.birthDate)
      newErrors.birthDate = "Birth date required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------------- SUBMIT ----------------
 const handleSubmit = (e) => {
  e.preventDefault();

  if (validate()) {
    console.log(formData);
    alert("Form submitted successfully ✅");

    // ✅ RESET FORM AFTER SUBMIT
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

    setErrors({});
  }
};


  return (
    <form onSubmit={handleSubmit} className="validation-form">
      <h2 className="form-title">Registration Form</h2>

      <div className="form-group">
        <label>First Name</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter first name"
          className="form-input"
        />
        {errors.firstName && (
          <p className="error-text">{errors.firstName}</p>
        )}
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-input"
        />
        {errors.lastName && (
          <p className="error-text">{errors.lastName}</p>
        )}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
        {errors.email && (
          <p className="error-text">{errors.email}</p>
        )}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="form-input"
        />
        {errors.phoneNumber && (
          <p className="error-text">{errors.phoneNumber}</p>
        )}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-input"
        />
        {errors.password && (
          <p className="error-text">{errors.password}</p>
        )}
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-input"
        />
        {errors.confirmPassword && (
          <p className="error-text">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="form-input"
        />
        {errors.age && (
          <p className="error-text">{errors.age}</p>
        )}
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="error-text">{errors.gender}</p>
        )}
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="form-input"
        />
        {errors.birthDate && (
          <p className="error-text">{errors.birthDate}</p>
        )}
      </div>

      <div className="form-group">
        <label>Interests</label>
        <div className="checkbox-row">
  <label>
    <input
      type="checkbox"
      value="coding"
      checked={formData.interests.includes("coding")}
      onChange={handleChange}
    />
    Coding
  </label>

  <label>
    <input
      type="checkbox"
      value="travelling"
      checked={formData.interests.includes("travelling")}
      onChange={handleChange}
    />
    Travelling
  </label>

  <label>
    <input
      type="checkbox"
      value="music"
      checked={formData.interests.includes("music")}
      onChange={handleChange}
    />
    Music
  </label>
</div>

      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default Validation;
