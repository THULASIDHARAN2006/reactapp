import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Reg = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    // Client-side validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setIsSuccess(false);
      return;
    }

    setLoading(true); // Disable button during API call

    try {
      const res = await axios.post(
        "http://localhost:5000/admin/register",
        formData
      );

      setMessage(res.data.message || "Registration successful!");
      setIsSuccess(true);

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
      setIsSuccess(false);
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Register</h1>
        <p>Create your admin account</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder=" " /* Required for the CSS floating label effect */
              required
            />
            <span>Username</span>
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <span>Email</span>
          </div>

          <div className="field">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <span>Password</span>
          </div>

          <div className="field">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <span>Confirm Password</span>
          </div>

          {/* Button is disabled while loading to prevent multiple submissions */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {message && (
            <div className={`message-box ${isSuccess ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Reg;