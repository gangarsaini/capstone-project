import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './global.css'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError]   = useState('')
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
     };

    const handleLogin = async () => {
  if (!email || !password){
    setError("Please Enter Email and Password");
    return;
  }

  if(!isValidEmail(email)){
    setError("Enter valid email");
    return;
  }
  try{
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/");
  } 
  catch (err) {
      setError(err.response?.data?.message || "Invalid email or password"); 
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
      <div className="relative">
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-xl w-[320px] outline-0 cursor-pointer">
        Login
      </button>
        {error && (
        <p className="text-red-500 text-[14px] custum-change text-center ">{error}</p>
        )}
      </div>
                <p className="mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
                Register
            </Link>
         </p>
    </div>
  );
}

export default Login;