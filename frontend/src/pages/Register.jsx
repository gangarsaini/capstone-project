import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";
function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        username,
        email,
        password
      });

      alert("Registered successfully");

      // 👉 redirect to login
      navigate("/");

    } catch (err) {
     
      alert(err.response.data.message);
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

      <button
        onClick={handleRegister}
        className="bg-green-900 text-white px-4 py-2 mt-2 rounded-xl w-[320px] outline-0"
      >
        Register
      </button>
        <p className="mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
                login here
            </Link>
</p>
    </div>
  );
}

export default Register;