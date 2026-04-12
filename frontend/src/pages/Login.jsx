import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     const res = await API.post("/auth/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     alert("Login successful");
//   };

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    alert("Login successful");
  } catch (err) {
    console.log(err.response.data); // 👈 VERY IMPORTANT
    alert(err.response.data.message);
  }
};

  return (
    <div className="flex flex-col items-center mt-10">
        <h1 className="text-5xl mb-3">Sign in</h1>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 m-2 rounded-xl w-[320px] outline-0"
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2 rounded-xl w-[320px] outline-0"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-xl w-[320px] outline-0 cursor-pointer">
        Login
      </button>
                <p className="mt-3">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
                Register
            </Link>
</p>
    </div>
  );
}

export default Login;