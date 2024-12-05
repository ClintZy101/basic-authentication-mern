import React, { useState } from "react";
import { LOCALHOST } from "../api/url";
import axios from "axios";

export default function Register() {
  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFormValue = (e) => {
    const { name, value } = e.target;
    setFormValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValue.username) {
      newErrors.username = "Username is Required";
    }
    if (!formValue.password) {
      newErrors.password = "Password is Required";
    } else if (formValue.password.length < 8) {
      newErrors.password = "Password must be atleast 8 characters";
    }
    if (formValue.password !== confirmPassword) {
      newErrors.password = "Passwords do not match ";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setErrors({});

        const response = await axios.post(`${LOCALHOST}/register`, formValue);

        console.log("Registration Success", response?.data);
        setFormValue({ username: "", password: "" });
        setConfirmPassword("");
        setSubmitStatus({ success: true, message: "Registration Successful" });
      } catch (err) {
        // Handle errors, such as "User already exists"
        const errorMessage =
          err.response?.data?.message || "Something went wrong!";
        setErrorMessage(errorMessage); // Backend error message
      }
    }
  };

  // console.log(errorMessage);

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit}
        className="grid gap-2 p-5 bg-gray-100 mx-auto max-w-[500px] mt-20"
      >
        <h2 className="mb-5 font-semibold">Register</h2>
        <div className="w-full">
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )}
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formValue.username}
            className="border p-2 max-w-[500px] w-full"
            onChange={handleFormValue}
          />
        </div>
        <div className="w-full">
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={formValue.password}
            className="border p-2 max-w-[500px] w-full"
            onChange={handleFormValue}
          />
        </div>

        <input
          type="text"
          placeholder="Confirm password"
          value={confirmPassword}
          className="border p-2 max-w-[500px]"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 px-5 bg-blue-500 text-white mt-5 hover:bg-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
