import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Signup() {
  const [role, setRole] = useState("restaurant");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Password check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Phone check
    if (phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

   console.log("Signup started");

const userCredential = await createUserWithEmailAndPassword(
  auth,
  email,
  password
);
const user = userCredential.user;

console.log("Firebase success");

    // 🔥 2. Get token
    const token = await user.getIdToken();
    const res = await fetch("http://localhost:5000/api/users/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    role: role.toUpperCase(),
    name,
    phone,
    address,
  }),
});

const data = await res.json();
console.log("Backend response:", data);

    // 🔥 3. Send to backend
    await fetch("http://localhost:5000/api/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        role: role.toUpperCase(), // 👈 IMPORTANT
        name,
        phone,
        address,
      }),
    });

    alert("Signup successful ");

  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center text-green-500">
          Signup
        </h2>

        {/* Role Selector */}
        <div className="flex mb-4">
          <button
            type="button"
            onClick={() => setRole("restaurant")}
            className={`flex-1 p-2 ${role === "restaurant" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            Restaurant
          </button>
          <button
            type="button"
            onClick={() => setRole("ngo")}
            className={`flex-1 p-2 ${role === "ngo" ? "bg-green-600 text-white" : "bg-gray-200"}`}
          >
            NGO
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Common Fields */}
          <input
  className="w-full border p-2 rounded"
  placeholder="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          <input
            className="w-full border p-2 rounded"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <input
  className="w-full border p-2 rounded"
  placeholder="Address / City"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
/>

          <input
            className="w-full border p-2 rounded"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
          />

          {/* Role-based Fields */}
          {role === "restaurant" && (
            <>
             <input
  className="w-full border p-2 rounded"
  placeholder="Restaurant Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
              <input className="w-full border p-2 rounded" placeholder="Owner Name (optional)" />
            </>
          )}

          {role === "ngo" && (
            <>
             <input
  className="w-full border p-2 rounded"
  placeholder="NGO Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
              <input className="w-full border p-2 rounded" placeholder="Capacity (optional)" />
            </>
          )}

          <button className="w-full bg-green-600 text-white p-2 rounded">
            Signup
          </button>

          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link 
              to="/" 
              className="text-green-600 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
}

export default Signup;