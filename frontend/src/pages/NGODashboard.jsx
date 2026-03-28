import { useState } from "react";

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
      <nav className="bg-[#ccbeb1] shadow-sm px-6 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">🤝 NGO Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome NGO</div>
   
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6 flex justify-between items-center">

  {/* LEFT: Header */}
  <div>
    <h2 className="text-2xl font-bold">Available Donations</h2>
    <p className="text-gray-500 text-sm">
      Accept food from nearby restaurants
    </p>
  </div>

  {/* RIGHT: Button */}
  <button
    onClick={() => window.location.href = "/ngo-map"}
    className="bg-[#8B735C] text-white px-4 py-2 rounded-lg hover:bg-[#5C4A3D] hover:-translate-y-0.5 transition-all duration-200">
    View Map
  </button>

</div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold">32</h3>
            <p className="text-gray-500 text-sm">Meals Received</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold">8</h3>
            <p className="text-gray-500 text-sm">Donations Accepted</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-xl font-bold">5</h3>
            <p className="text-gray-500 text-sm">Pending Pickups</p>
          </div>
        </div>

        {/* Donations List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* LEFT: Donations List */}
  <div className="lg:col-span-2 bg-white rounded-xl shadow divide-y">
    {data.map((item) => (
      <div key={item.id} className="p-4 flex justify-between items-center">

        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">
            {item.qty} • {item.restaurant}
          </p>
          <p className="text-xs text-amber-500">
            Expires: {item.expires}
          </p>
        </div>

        <button
          disabled={item.status === "claimed"}
          onClick={() => handleAccept(item.id)}
          className={`px-4 py-2 rounded text-sm transition ${
            item.status === "claimed"
              ? "bg-[#D8CFC4] text-[#5C4A3D]"
              : "bg-[#5C4A3D] text-white hover:bg-[#3E3228]"
          }`}
        >
          {item.status === "claimed" ? "Accepted" : "Accept"}
        </button>

      </div>
    ))}
  </div>

  {/* RIGHT: Upcoming Pickups */}
  <div className="bg-white p-5 rounded-xl shadow h-fit">
    <h3 className="font-bold mb-3">📅 Upcoming Pickups</h3>

    <div className="space-y-2 text-sm text-gray-600">
      <p>🕖 7:30 PM - Spice Paradise</p>
      <p>🕘 9:00 PM - Food Hub</p>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}