import { useState } from "react";
import { Link } from "react-router-dom";
const donations = [
  { id: 1, name: "Paneer Butter Masala", qty: "8 kg", expires: "9:00 PM", restaurant: "Spice Paradise", status: "available" },
  { id: 2, name: "Dal Tadka", qty: "10 kg", expires: "10:00 PM", restaurant: "Food Hub", status: "available" },
  { id: 3, name: "Roti Packets", qty: "50 pcs", expires: "8:00 PM", restaurant: "Tandoor House", status: "claimed" },
];

export default function NGODashboard() {
  const [data, setData] = useState(donations);


  const handleAccept = (id) => {
    setData(
      data.map((d) =>
        d.id === id ? { ...d, status: "claimed" } : d
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f6f3]">

      {/* Navbar */}
      <nav className="bg-[#ccbeb1] border-b border-gray-200 sticky top-0 z-30 shadow-sm">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

    {/* Left (Clickable Logo) */}
    <Link to="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
      <span className="text-xl">🤝</span>
      <div>
        <p className="font-bold text-gray-900 text-base leading-none">
          ResQMeal
        </p>
        <p className="text-[11px] text-gray-700 uppercase tracking-wide">
          NGO Portal
        </p>
      </div>
    </Link>

    {/* Right */}
    <div className="text-sm text-gray-600 font-medium">
      Welcome NGO
    </div>

  </div>
</nav>
    <main className="max-w-7xl mx-auto px-6 py-8">
  {/* LEFT: Header */}
  <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">

  <div>
    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
  Good evening, NGO 👋
</h1>

<p className="text-gray-500 mt-1 text-sm">
  You have <span className="font-semibold text-[#664930]">3 available donations</span> · 2 expiring soon
</p>
  </div>

  <button
    onClick={() => window.location.href = "/ngo-map"}
    className="bg-[#8B735C] hover:bg-[#5C4A3D] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all active:scale-95"
  >
    View Map
  </button>

</div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

  {/* Meals Received */}
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-100 mb-3 text-lg">
      🍽️
    </div>
    <h3 className="text-2xl font-bold text-gray-900">32</h3>
    <p className="text-gray-500 text-sm">Meals Received</p>
    <p className="text-green-600 text-xs mt-1">+5 today</p>
  </div>

  {/* Donations Accepted */}
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-100 mb-3 text-lg">
      📦
    </div>
    <h3 className="text-2xl font-bold text-gray-900">8</h3>
    <p className="text-gray-500 text-sm">Donations Accepted</p>
    <p className="text-green-600 text-xs mt-1">+2 this week</p>
  </div>

  {/* Pending Pickups */}
  <div className="bg-white p-6 rounded-2xl shadow-sm">
    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 mb-3 text-lg">
      ⏳
    </div>
    <h3 className="text-2xl font-bold text-gray-900">5</h3>
    <p className="text-gray-500 text-sm">Pending Pickups</p>
    <p className="text-amber-600 text-xs mt-1">2 arriving soon</p>
  </div>

</div>

        {/* Donations Section */}
<div className="grid lg:grid-cols-3 gap-6">

  {/* LEFT: Donations Panel */}
  <div className="lg:col-span-2 bg-[#EDE7E1] rounded-2xl shadow-sm p-5">

    {/* Panel Header */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-gray-800 text-lg">
        Available Donations
      </h3>
      <span className="text-sm text-gray-500">
        {data.length} items
      </span>
    </div>

    {/* List */}
    <div className="divide-y">

      {data.map((item) => (
        <div
          key={item.id}
          className="py-4 flex justify-between items-center hover:bg-[#FAF9F7] px-2 rounded-lg transition"
        >

          {/* LEFT CONTENT */}
          <div>
            <h3 className="font-semibold text-gray-900">
              {item.name}
            </h3>

            <p className="text-sm text-gray-500">
              {item.qty} • {item.restaurant}
            </p>

            <p className="text-xs text-amber-500 mt-1">
              ⏳ Expires: {item.expires}
            </p>
          </div>

          {/* RIGHT ACTION */}
          <button
            disabled={item.status === "claimed"}
            onClick={() => handleAccept(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              item.status === "claimed"
                ? "bg-[#D8CFC4] text-[#5C4A3D]"
                : "bg-[#664930] text-white hover:bg-[#4a3520] hover:-translate-y-0.5"
            }`}
          >
            {item.status === "claimed" ? "Accepted" : "Accept"}
          </button>

        </div>
      ))}

    </div>

  </div>

  {/* RIGHT: Sidebar (keep your existing cards here) */}
  <div className="flex flex-col gap-5">

  {/* Upcoming Pickups */}
  <div className="bg-[#EDE7E1] p-5 rounded-2xl shadow-sm">
    <h3 className="font-bold mb-3">📅 Upcoming Pickups</h3>

    <div className="space-y-2 text-sm text-gray-600">
      <p>🕖 7:30 PM - Spice Paradise</p>
      <p>🕘 9:00 PM - Food Hub</p>
    </div>
  </div>

  {/* Recent Activity */}
  <div className="bg-[#EDE7E1] p-5 rounded-2xl shadow-sm">
    <h3 className="font-bold mb-3">⚡ Recent Activity</h3>

    <div className="text-sm text-gray-600 space-y-2">
      <p>Accepted Paneer Butter Masala</p>
      <p>Picked up Dal Tadka</p>
    </div>
  </div>

  {/* Impact */}
  <div className="bg-gradient-to-br from-[#8B735C] to-[#5C4A3D] rounded-2xl p-5 text-white">
    <h3 className="font-bold mb-2">🌍 Impact</h3>
    <p className="text-sm text-white">You helped save</p>
    <p className="text-xl font-bold text-white">120 meals</p>
  </div>

</div>

</div>

      </main>
    </div>
  );
}