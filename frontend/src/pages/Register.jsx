import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";
import './global.css';
function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError] = useState('')

  const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

 const handleRegister = async () => {
  // Validate first
  if (!username || !email || !password) {
    setError("Please fill all fields");
    return;
  }

  if (!isValidEmail(email)) {
    setError("Invalid email format");
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  try {
    // Call API only after validation
    await API.post("/auth/register", {
      username,
      email,
      password
    });

    setError(""); // clear error

    // Step 3: Navigate only after success
    navigate("/login");

  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 m-2 rounded-xl w-[320px] outline-0"
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 m-2  rounded-xl w-[320px] outline-0"
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2 rounded-xl w-[320px] outline-0"
      />

      <div className="relative">
      <button
        onClick={handleRegister}
        className="bg-green-900 text-white px-4 py-2 mt-2 rounded-xl w-[320px] outline-0 cursor-pointer"
      >
        Register
      </button>
      <p className="text-red-500 text-[14px] custum-change">{error}</p>
      </div>
        <p className="mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
                login here
            </Link>
</p>
    </div>
  );
}

export default Register;