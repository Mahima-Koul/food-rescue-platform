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

    alert("Login successful 🚀");

    // 👉 redirect (important)
    window.location.href = "/dashboard";

  }catch (error) {
  console.log(error);
  setError(error.message);
}
};

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-80 text-center">
        
        <h2 className="mb-5 text-green-600 text-2xl font-bold">Login</h2>

        <form onSubmit={handleLogin} noValidate>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg outline-none"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg outline-none"
          />

          {error && (
            <p className="text-red-500 mb-3">{error}</p>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
          >
            Login
          </button>

          <p className="mt-4 text-sm">
            New user?{" "}
            <Link 
                to="/signup" 
                className="text-green-600 font-semibold hover:underline">
                Sign up here
            </Link>
          </p>  
        </form>
      </div>
    </div>
  );
}

export default Login;