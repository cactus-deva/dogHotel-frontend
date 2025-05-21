// src/pages/admin/AdminSignUp.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminSignUp } from "../../api/adminApi/adminApi";

function AdminSignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await adminSignUp({ username, email, password });
      console.log(res.data,'resdata')
      setSuccess("Admin account created successfully");
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2F2F2F] px-4">
      <div className="bg-[#3B3B3B] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Sign Up
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-[#555] text-white placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-[#555] text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-[#555] text-white placeholder-gray-400"
        />
        {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
        {success && <p className="text-green-400 text-sm text-center mb-2">{success}</p>}
        <button
          onClick={handleSignup}
          className="w-full py-2 bg-[#A88763] text-white rounded hover:bg-[#926f4e]"
        >
          Sign Up
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-300 text-sm">
            Already have an account? {" "}
            <a href="/admin/login" className="underline text-[#C2B280] hover:text-white">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminSignUp;
