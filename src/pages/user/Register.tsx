import { useState } from "react";
import { registerUser, UserDataProps } from "../../api/userApi/userApi";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [form, setForm] = useState<UserDataProps>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z]+$/;
    const usernameRegex = /^[a-zA-Z0-9._]{8,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!nameRegex.test(form.first_name) || !nameRegex.test(form.last_name)) {
      setStatusMessage(
        "Firstname or Lastname must contain only English letters"
      );
      return
    }
    if (!usernameRegex.test(form.username)) {
      setStatusMessage(
        "Username must be 8-20 characters and can contain only letters, numbers, dots, and underscores"
      );
      return
    }
    if (!passwordRegex.test(form.password)) {
       setStatusMessage(
        "Password must be at least 8 characters, include upper and lower case letters, and a number."
      );
      return
    }

    setIsLoading(true);

    setTimeout(() => {
      navigate("/login");
    }, 1500);

    try {
      await registerUser(form);
      setStatusMessage("Register Success! Redirecting to Login...");
      setForm({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setStatusMessage(error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        setStatusMessage(error.message);
      } else {
        setStatusMessage("Failed to Register");
      }
    }
    setIsLoading(false);
  };
  return (
    <section className="min-h-screen bg-[#FDF9F1] flex flex-col items-center justify-center px-4 mt-30 md:mt-10">
      <img src={logo} className="h-30 w-30 mb-5 rounded-full" />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-xl md:text-2xl font-bold text-[#A88763] text-center ">
          Create Account
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#AB8763]">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            maxLength={50}
            required
            className="border border-gray-300 rouned px-4 py-2 placeholder:text-gray-400 text-[#AB8763]"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            maxLength={50}
            required
            className="border border-gray-300 rouned px-4 py-2 placeholder:text-gray-400 text-[#AB8763]"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          maxLength={100}
          required
          className="w-full border border-gray-300 rouned px-4 py-2 placeholder:text-gray-400 text-[#AB8763]"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          maxLength={20}
          required
          className="w-full border border-gray-300 rouned px-4 py-2 placeholder:text-gray-400 text-[#AB8763]"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          minLength={8}
          maxLength={50}
          required
          className="w-full border border-gray-300 rouned px-4 py-2 placeholder:text-gray-400 text-[#AB8763]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          minLength={8}
          required
          className="w-full border border-gray-300 rouned px-4 py-2 placeholder:text-gray-400 text-[#AB8763]"
        />
        <button
          type="submit"
          className="w-full bg-[#A88763] text-white font-semibold py-2 rounded hover:bg-[#926f4e] transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {statusMessage && (
          <p className="text-center text-sm text-red-500">{statusMessage}</p>
        )}
      </form>
    </section>
  );
}

export default Register;
