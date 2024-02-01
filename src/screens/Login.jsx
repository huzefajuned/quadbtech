import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Component for the login screen.
 * Allows users to enter their name, email, password, and confirm password.
 * Handles form submission, validation, and local storage.
 */
const Login = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuth();
  const navigate = useNavigate();

  /**
   * if user is already  loggedIn
   * navigate to home route
   */
  useEffect(() => {
    isLoggedIn && navigate("/");
  }, []);
  /**
   * navigating
   */

  // State for form data and error message
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // Function to handle input change in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");

      return;
    }

    if (password !== confirmPassword) {
      //   setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    // Store data in local storage
    localStorage.setItem("user", JSON.stringify(formData));
    setIsLoggedIn(true);
    navigate("/");

    // update the user state
    const _User = JSON.parse(localStorage.getItem("user"));
    setUser(_User);

    toast.success(` Welcome ${_User?.name} 🤗 `);
    // Clear form data and error message
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1f2544]">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl border-2 ">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">
          Create your account 🔏🔏
        </h2>
        {error && (
          <p className="text-center text-sm text-red-600 mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
