import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const listings = [
  { id: 1, name: "Paneer Butter Masala", qty: "8 kg", expires: "Today, 9:00 PM", category: "Cooked Meal", status: "active", claimed: false, ngo: null },
  { id: 2, name: "Tandoori Rotis", qty: "60 pcs", expires: "Today, 8:00 PM", category: "Bread", status: "claimed", claimed: true, ngo: "Akshaya Patra" },
  { id: 3, name: "Dal Tadka", qty: "12 kg", expires: "Today, 10:00 PM", category: "Cooked Meal", status: "active", claimed: false, ngo: null },
  { id: 4, name: "Mixed Salad", qty: "5 kg", expires: "Today, 7:30 PM", category: "Raw / Produce", status: "expired", claimed: false, ngo: null },
  { id: 5, name: "Raita", qty: "4 kg", expires: "Tomorrow, 8:00 AM", category: "Dairy", status: "active", claimed: false, ngo: null },
];

const stats = [
  { label: "Meals Donated", value: "1,248", delta: "+12 this week", icon: "🍽️", color: "from-emerald-500 to-teal-600" },
  { label: "Active Listings", value: "3", delta: "2 expiring soon", icon: "📋", color: "from-amber-500 to-orange-500" },
  { label: "NGOs Served", value: "14", delta: "+2 this month", icon: "🤝", color: "from-sky-500 to-blue-600" },
  { label: "Food Saved (kg)", value: "892", delta: "+34 kg today", icon: "♻️", color: "from-violet-500 to-purple-600" },
];

const categories = ["All", "Cooked Meal", "Bread", "Raw / Produce", "Dairy", "Dessert", "Beverages"];

const statusBadge = (status) => {
  const map = {
    active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    claimed: "bg-sky-100 text-sky-700 border-sky-200",
    expired: "bg-red-100 text-red-600 border-red-200",
  };
  return map[status] || "";
};

const recentActivity = [
  { time: "2h ago", text: "Akshaya Patra claimed your Tandoori Rotis listing", type: "claimed" },
  { time: "5h ago", text: "New listing 'Raita' published successfully", type: "published" },
  { time: "Yesterday", text: "Robin Hood Army picked up Dal Makhani (10 kg)", type: "pickup" },
  { time: "2 days ago", text: "Listing 'Mixed Salad' expired without a claim", type: "expired" },
];

const activityIcon = (type) => {
  const map = { claimed: "🤝", published: "✅", pickup: "🚚", expired: "⏰" };
  return map[type] || "📌";
};

const foodIcon = (category) => {
  const map = {
    "Cooked Meal": "🍛",
    "Bread": "🫓",
    "Dairy": "🥛",
    "Raw / Produce": "🥗",
    "Dessert": "🍮",
    "Beverages": "🧃",
  };
  return map[category] || "🍱";
};

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("listings");
  const [filterCat, setFilterCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", qty: "", unit: "kg", category: "Cooked Meal", expires: "", notes: "" });
  const [listData, setListData] = useState(listings);
  const [searchQ, setSearchQ] = useState("");

  const filtered = listData.filter(
    (l) =>
      (filterCat === "All" || l.category === filterCat) &&
      l.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  const handleAdd = async () => {
  if (!form.name || !form.qty || !form.expires) return;

  try {
    // 🔥 SAVE TO FIRESTORE
    const docRef = await addDoc(collection(db, "donations"), {
      foodName: form.name,
      quantity: Number(form.qty),
      unit: form.unit,
      category: form.category,
      expiryTime: form.expires,
      notes: form.notes,
      status: "available",
      restaurantId: auth.currentUser?.uid,
      createdAt: serverTimestamp(),
    });

    // 🔥 ALSO UPDATE UI (so user sees instantly)
    const newItem = {
      id: docRef.id,
      name: form.name,
      qty: `${form.qty} ${form.unit}`,
      expires: form.expires,
      category: form.category,
      status: "active",
      claimed: false,
      ngo: null,
    };

    setListData([newItem, ...listData]);

    setShowModal(false);
    setForm({
      name: "",
      qty: "",
      unit: "kg",
      category: "Cooked Meal",
      expires: "",
      notes: "",
    });

    alert("Listing added 🚀");

  } catch (err) {
    console.log(err);
    alert("Error adding listing ❌");
  }
};
  const handleDelete = (id) => setListData(listData.filter((l) => l.id !== id));

  return (
    <div className="min-h-screen bg-[#f4f6f3] font-sans">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🥗</span>
            <div>
              <p className="font-bold text-gray-900 text-base leading-none tracking-tight">FoodBridge</p>
              <p className="text-[11px] text-gray-400 tracking-wide uppercase">Restaurant Portal</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            {["listings", "analytics", "ngos"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "listings" ? "🍱 Listings" : tab === "analytics" ? "📊 Analytics" : "🤝 NGOs"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold">
              SP
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800 leading-none">Spice Paradise</p>
              <p className="text-xs text-gray-400">Koramangala, Bengaluru</p>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Good evening, Spice Paradise 👋
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              You have <span className="font-semibold text-emerald-600">3 active listings</span> · 2 expiring within 2 hours
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-emerald-200 transition-all active:scale-95"
          >
            <span className="text-base">+</span> Add Food Listing
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-lg mb-3`}>
                {s.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs font-medium text-gray-500 mt-0.5">{s.label}</p>
              <p className="text-xs text-emerald-600 mt-1.5 font-medium">{s.delta}</p>
            </div>
          ))}
        </div>

        {/* Tab: Listings */}
        {activeTab === "listings" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Listings Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <h2 className="text-base font-bold text-gray-800">Food Listings</h2>
                    <input
                      type="text"
                      placeholder="Search listings..."
                      value={searchQ}
                      onChange={(e) => setSearchQ(e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full sm:w-48"
                    />
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {categories.map((c) => (
                      <button
                        key={c}
                        onClick={() => setFilterCat(c)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          filterCat === c
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-gray-50 text-gray-500 border-gray-200 hover:border-emerald-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {filtered.length === 0 && (
                    <div className="py-14 text-center text-gray-400">
                      <p className="text-3xl mb-2">🍽️</p>
                      <p className="text-sm">No listings found.</p>
                    </div>
                  )}
                  {filtered.map((item) => (
                    <div key={item.id} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-lg flex-shrink-0">
                        {foodIcon(item.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.qty} · <span className={item.status === "expired" ? "text-red-400" : "text-amber-500"}>Expires: {item.expires}</span>
                        </p>
                        {item.claimed && (
                          <p className="text-xs text-sky-600 font-medium mt-0.5">📦 Claimed by {item.ngo}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${statusBadge(item.status)}`}>
                          {item.status}
                        </span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all text-xl leading-none"
                          title="Remove listing"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="flex flex-col gap-5">
              {/* Pickup Schedule */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-800 text-sm mb-4">📅 Today's Pickup Schedule</h3>
                <div className="space-y-3">
                  {[
                    { time: "7:30 PM", ngo: "Akshaya Patra", item: "Tandoori Rotis", confirmed: true },
                    { time: "9:00 PM", ngo: "Pending", item: "Paneer Butter Masala", confirmed: false },
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="text-xs font-bold text-gray-400 w-14 pt-0.5 flex-shrink-0">{p.time}</div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-3">
                        <p className="text-xs font-semibold text-gray-700">{p.item}</p>
                        <p className={`text-xs mt-0.5 ${p.confirmed ? "text-emerald-600" : "text-amber-500"}`}>
                          {p.confirmed ? `✅ ${p.ngo}` : "⏳ Awaiting claim"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-800 text-sm mb-4">🕐 Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((a, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-base mt-0.5">{activityIcon(a.type)}</span>
                      <div>
                        <p className="text-xs text-gray-700 leading-relaxed">{a.text}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white">
                <p className="text-xs font-semibold opacity-70 uppercase tracking-wide mb-1">Your Impact</p>
                <p className="text-3xl font-bold">1,248</p>
                <p className="text-sm opacity-80 mt-1">meals provided to people in need</p>
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-xs">
                  <div>
                    <p className="font-bold text-lg">892 kg</p>
                    <p className="opacity-70">food rescued</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg">14</p>
                    <p className="opacity-70">NGO partners</p>
                  </div>
                  <div>
                    <p className="font-bold text-lg">62%</p>
                    <p className="opacity-70">claim rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Analytics */}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-5xl mb-4">📊</p>
            <p className="font-bold text-gray-700 text-lg">Analytics coming soon</p>
            <p className="text-sm text-gray-400 mt-2">Track trends, peak donation times, and NGO claim rates.</p>
          </div>
        )}

        {/* Tab: NGOs */}
        {activeTab === "ngos" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Akshaya Patra", area: "Pan India", meals: 420, verified: true },
              { name: "Robin Hood Army", area: "Bengaluru", meals: 310, verified: true },
              { name: "Feeding India", area: "South India", meals: 200, verified: false },
              { name: "No Food Waste", area: "Bengaluru", meals: 180, verified: true },
            ].map((n) => (
              <div key={n.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-2xl">🤝</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-800 text-sm">{n.name}</p>
                    {n.verified && <span className="text-sky-500 text-xs font-medium">✔ Verified</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{n.area}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-2">{n.meals} meals collected</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Listing Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-base">New Food Listing</h3>
                <p className="text-xs text-gray-400 mt-0.5">Help feed someone today</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">Food Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Paneer Tikka"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">Quantity *</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.qty}
                    onChange={(e) => setForm({ ...form, qty: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div className="w-28">
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">Unit</label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                  >
                    {["kg", "lbs", "pcs", "litres", "portions"].map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                >
                  {categories.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">Expires At *</label>
                <input
                  type="datetime-local"
                  value={form.expires}
                  onChange={(e) => setForm({ ...form, expires: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">Notes</label>
                <textarea
                  placeholder="Allergens, storage requirements, pickup instructions..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                />
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!form.name || !form.qty || !form.expires}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md shadow-emerald-200"
              >
                Publish Listing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}