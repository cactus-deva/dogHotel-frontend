

import { adminLogin } from "../../api/adminApi/adminApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminLogin () {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [statusMessage, setStatusMessage] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await adminLogin({username, password})
            localStorage.setItem("token", res.token)
            navigate("/admin/dashboard")
        } catch (err:any) {
            setStatusMessage(err?.response?.data?.message || "Login failed")
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
           if(statusMessage){
            setStatusMessage(null)
           }
        }, 2000);
        return () => clearInterval(timeout)
    },[statusMessage])
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-[#2F2F2F] px-4">
      <div className="bg-[#3B3B3B] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Admin Login
        </h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-[#555] text-white placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-[#555] text-white placeholder-gray-400"
        />
        {statusMessage && <p className="text-red-400 text-sm text-center mb-2">{statusMessage}</p>}
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-[#A88763] text-white rounded hover:bg-[#926f4e]"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <p className="text-gray-300 text-sm">
            Don't have an account?{" "}
            <Link to="/admin/signup" className="underline text-[#C2B280] hover:text-white">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


export default AdminLogin