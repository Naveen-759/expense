import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalState";
import { toast } from "react-toastify";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useGlobal();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const res_data = await response.json();
        // console.log("resopnse from login", res_data.accessToken);
        storeTokenInLS(res_data.accessToken);

        setFormData({
          email: "",
          password: "",
        });
        toast.success("Logged in successfully");
        navigate("/home");
      } else {
        toast.error("Invalid email or password");
      }
      // console.log(response);
    } catch (error) {
      console.log("error", error);
    }
    // You can handle form submission logic here, such as API requests
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};
