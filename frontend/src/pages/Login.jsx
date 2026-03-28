import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      console.log("Login success", token);

      let role = "restaurant";
      if (email.toLowerCase().includes("ngo")) {
        role = "ngo";
      }

      localStorage.setItem("role", role);

      alert("Login successful 🚀");

      if (role === "ngo") {
        window.location.href = "/ngo-dashboard";
      } else {
        window.location.href = "/restaurant-dashboard";
      }

    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#f5efe6] to-[#e8dccf] px-4">

      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md text-center border border-[#e5ddd2]">

        <h2 className="mb-6 text-3xl font-bold text-[#3e2f25]">
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin} noValidate>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-[#d6ccc2] rounded-lg outline-none focus:ring-2 focus:ring-[#c8b6a6] transition"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-[#d6ccc2] rounded-lg outline-none focus:ring-2 focus:ring-[#c8b6a6] transition"
          />

          {error && (
            <p className="text-red-500 mb-3 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#8b6f5a] text-white rounded-lg font-semibold hover:bg-[#6f5646] transition shadow-md"
          >
            Login
          </button>

          <p className="mt-5 text-sm text-gray-600">
            New user?{" "}
            <Link 
              to="/signup" 
              className="text-[#8b6f5a] font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>  

        </form>
      </div>
    </div>
  );
}

export default Login;