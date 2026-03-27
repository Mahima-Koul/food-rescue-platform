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
      <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
        <h1 className="font-bold text-lg">🤝 NGO Dashboard</h1>
        <div className="text-sm text-gray-500">Welcome NGO</div>
   
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <button
  onClick={() => window.location.href = "/ngo-map"}
  className="bg-black text-white px-3 py-1 rounded"
>
  View Map
</button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Available Donations</h2>
          <p className="text-gray-500 text-sm">Accept food from nearby restaurants</p>
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
        <div className="bg-white rounded-xl shadow divide-y">
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
                className={`px-4 py-2 rounded text-white text-sm ${
                  item.status === "claimed"
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {item.status === "claimed" ? "Accepted" : "Accept"}
              </button>

            </div>
          ))}
        </div>

        {/* Pickup Section */}
        <div className="mt-8 bg-white p-5 rounded-xl shadow">
          <h3 className="font-bold mb-3">📅 Upcoming Pickups</h3>

          <div className="space-y-2 text-sm text-gray-600">
            <p>🕖 7:30 PM - Spice Paradise</p>
            <p>🕘 9:00 PM - Food Hub</p>
          </div>
        </div>

      </main>
    </div>
  );
}