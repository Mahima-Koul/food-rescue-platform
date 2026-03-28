import { useState } from "react";
import { initialListings } from "../../constants";
import StatsGrid from "../components/restaurant/StatsGrid";
import ListingsPanel from "../components/restaurant/ListingPanel";
import PickupSchedule from "../components/restaurant/PickupSchedule";
import RecentActivity from "../components/restaurant/RecentActivity";
import ImpactCard from "../components/restaurant/ImpactCard";
import AddListingModal from "../components/restaurant/AddListingModel";
import NGOGrid from "../components/restaurant/NGOGrid";

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("listings");
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState(initialListings);

  const handleAdd = (newItem) => setListings([newItem, ...listings]);
  const handleDelete = (id) => setListings(listings.filter((l) => l.id !== id));

  return (
    <div className="min-h-screen bg-[#f4f6f3] font-sans">
      {/* Top Nav */}
      <nav className="bg-[#ccbeb1] border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🥗</span>
            <div>
              <p className="font-bold text-gray-900 text-base leading-none tracking-tight">ResQMeal</p>
              <p className="text-[11px] text-gray-700 tracking-wide uppercase">Restaurant Portal</p>
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
            <div className="w-8 h-8 rounded-full bg-[#664930] flex items-center justify-center text-white text-sm font-bold">
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
              You have <span className="font-semibold text-[#664930]">3 active listings</span> · 2 expiring within 2 hours
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#664930] hover:bg-[#4a3520] text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-[#664930] transition-all active:scale-95"
          >
            <span className="text-base">+</span> Add Food Listing
          </button>
        </div>

        <StatsGrid />

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ListingsPanel listings={listings} onDelete={handleDelete} />
            </div>
            <div className="flex flex-col gap-5">
              <PickupSchedule />
              <RecentActivity />
              <ImpactCard />
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="bg-[#EDE7E1] rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <p className="text-5xl mb-4">📊</p>
            <p className="font-bold text-gray-700 text-lg">Analytics coming soon</p>
            <p className="text-sm text-gray-400 mt-2">Track trends, peak donation times, and NGO claim rates.</p>
          </div>
        )}

        {/* NGOs Tab */}
        {activeTab === "ngos" && <NGOGrid />}
      </main>

      {showModal && (
        <AddListingModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}