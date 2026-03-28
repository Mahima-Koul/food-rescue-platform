import { useState } from "react";

export default function NGOProfile() {
  const [user, setUser] = useState({
    name: "Helping Hands NGO",
    email: "ngo@email.com",
    location: "Bengaluru",
    phone: "+91 9876543210",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea]">

      {/* Navbar */}
      <nav className="bg-[#ccbeb1] border-b shadow-sm px-6 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">🤝 NGO Profile</h1>
        <button
          onClick={() => window.location.href = "/ngo-dashboard"}
          className="text-sm text-gray-700"
        >
          ← Back
        </button>
      </nav>

      <main className="max-w-4xl mx-auto p-6">

        <div className="bg-white rounded-xl shadow p-6">

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#664930] text-white flex items-center justify-center font-bold">
              HH
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.location}</p>
            </div>
          </div>

          {/* Fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              name="name"
              value={user.name}
              disabled={!editing}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              value={user.email}
              disabled
              className="p-2 border rounded bg-gray-100"
            />
            <input
              name="phone"
              value={user.phone}
              disabled={!editing}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              name="location"
              value={user.location}
              disabled={!editing}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          {/* Button */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setEditing(!editing)}
              className="bg-[#664930] hover:bg-[#4a3520] text-white px-4 py-2 rounded"
            >
              {editing ? "Save" : "Edit"}
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}