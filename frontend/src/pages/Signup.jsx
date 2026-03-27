import { useState } from "react";

function Signup() {
  const [role, setRole] = useState("restaurant");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

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

    alert("Signup successful");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">
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
          <input className="w-full border p-2 rounded" placeholder="Email" />

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

          <input className="w-full border p-2 rounded" placeholder="Address / City" />

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
              <input className="w-full border p-2 rounded" placeholder="Restaurant Name" />
              <input className="w-full border p-2 rounded" placeholder="Owner Name (optional)" />
            </>
          )}

          {role === "ngo" && (
            <>
              <input className="w-full border p-2 rounded" placeholder="NGO Name" />
              <input className="w-full border p-2 rounded" placeholder="Capacity (optional)" />
            </>
          )}

          <button className="w-full bg-green-600 text-white p-2 rounded">
            Signup
          </button>

        </form>

      </div>
    </div>
  );
}

export default Signup;