import { useState } from "react";
import { loginUser, LoginUserProps } from "../../api/userApi/userApi";
import logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState<LoginUserProps>({
    username: "",
    password: ""
  })

  const [message, setMessage] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    setMessage("")

    try {
      const response = await loginUser(form);
      const {token, userId, name} = response.data;
     
      localStorage.setItem("token", token);
      localStorage.setItem("userId", JSON.stringify(userId))
      localStorage.setItem("name", JSON.stringify(name))
      
      setMessage("Login Successfully Redirecting...")

      setTimeout(() => {
        navigate("/profile")
      },1500)
    } catch (error:any) {
      if(error.response?.data?.message) {
        setMessage(error.response.data.message)
      } else {
        setMessage("Login Failed")
      }
    }
    setIsLoading(false)
  };
  return (
    <section className="min-h-screen bg-[#FDF9F1] flex flex-col items-center justify-center px-4">
      <img src={logo}
      className="h-40 w-40 mb-10 rounded-full" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#A88763] text-center ">
          Login
        </h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rouned px-4 py-2 placeholder:text-gray-400 text-[#AB8763]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rouned px-4 py-2 placeholder:text-gray-400 text-[#AB8763]"
        />
        <button
          type="submit"
          className="w-full bg-[#A88763] text-white font-semibold py-2 rounded hover:bg-[#926f4e] transition"
        >
          {loading ? "Logging In..." : "Login"}
        </button>
        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </section>
  );
}

export default Login;

