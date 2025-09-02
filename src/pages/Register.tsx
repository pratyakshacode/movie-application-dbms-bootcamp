import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Service from "../utils/http";
import { useUser } from "../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const context = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const service = new Service();
      const res = await service.post("auth/register", form);
      const { data } = res;
      localStorage.setItem("wowuser", JSON.stringify({ token: data.token }))
      const userData = { token: data.token };
      context.setUser(userData);
      if(res?.message === "User registered successfully") {
        navigate("/");
      } else {
        alert("Registration failed");
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
