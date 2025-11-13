import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser(userData);
      console.log("✅ User registered:", res);

      toast.success("Account created successfully!", {
        position: "top-center",
        autoClose: 1500,
        onClose: () => navigate("/home"), // ✅ Navigate after toast
      });
    } catch (err) {
      console.error("❌ Error registering user:", err.response?.data || err.message);

      const errorMessage =
        err.response?.data?.message || "Signup failed! Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* ✅ Login link below form */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
