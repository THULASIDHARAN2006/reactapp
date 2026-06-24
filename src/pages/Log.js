// src/Login.js
import React, { useState } from "react";
import axios from "axios";
import "./Login.css"; // CSS file for styling

const Log = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIXED: Added "/api" to match your backend base route structure
      const res = await axios.post("http://localhost:5000/api/admin/login", formData);
      
      setMessage(res.data.message);
      setIsSuccess(true);
      
      console.log("Email:", formData.email);
      console.log("Password:", formData.password);
      console.log("User Data:", res.data);
      
      setFormData({ email: "", password: "" }); // clear form
    } catch (err) {
      // Dynamically displays 'Invalid credentials' or other messages from your controller
      setMessage(err.response?.data?.message || "Something went wrong");
      setIsSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {message && (
          <p className={`message ${isSuccess ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Log;