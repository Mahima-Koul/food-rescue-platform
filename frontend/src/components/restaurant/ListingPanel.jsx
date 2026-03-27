import { useState } from "react";
import { categories, statusBadge, foodIcon } from "../../../constants";
export default function ListingsPanel({ listings, onDelete }) {
  const [filterCat, setFilterCat] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const filtered = listings.filter(
    (l) =>
      (filterCat === "All" || l.category === filterCat) &&
      l.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
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

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {filtered.length === 0 && (
          <div className="py-14 text-center text-gray-400">
            <p className="text-3xl mb-2">🍽️</p>
            <p className="text-sm">No listings found.</p>
          </div>
        )}
        {filtered.map((item) => (
          <div
            key={item.id}
            className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-lg flex-shrink-0">
              {foodIcon(item.category)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {item.qty} ·{" "}
                <span className={item.status === "expired" ? "text-red-400" : "text-amber-500"}>
                  Expires: {item.expires}
                </span>
              </p>
              {item.claimed && (
                <p className="text-xs text-sky-600 font-medium mt-0.5">
                  📦 Claimed by {item.ngo}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${statusBadge(item.status)}`}>
                {item.status}
              </span>
              <button
                onClick={() => onDelete(item.id)}
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
  );
}