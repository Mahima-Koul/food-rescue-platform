import { useState } from "react";
import {db, auth } from "../../firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { categories } from "../../../constants";

const defaultForm = {
  name: "",
  qty: "",
  unit: "kg",
  category: "Cooked Meal",
  expires: "",
  notes: "",
};

export default function AddListingModal({ onClose, onAdd }) {
  const [form, setForm] = useState(defaultForm);

  const handleAdd = async () => {
    if (!form.name || !form.qty || !form.expires) return;

    try {
      const position = await new Promise((resolve, reject) =>
  navigator.geolocation.getCurrentPosition(resolve, reject)
);

const lat = position.coords.latitude;
const lng = position.coords.longitude; //location 
     const docRef = await addDoc(collection(db, "donations"), {
  foodName: form.name,
  quantity: Number(form.qty),
  unit: form.unit,
  category: form.category,
  expiryTime: form.expires,
  notes: form.notes,
  status: "available",
  restaurantId: auth.currentUser?.uid,

  location: {
    lat,
    lng
  },

  createdAt: serverTimestamp(),
});

      onAdd({
        id: docRef.id,
        name: form.name,
        qty: `${form.qty} ${form.unit}`,
        expires: form.expires,
        category: form.category,
        status: "active",
        claimed: false,
        ngo: null,
      });

      setForm(defaultForm);
      onClose();
      alert("Listing added 🚀");
    } catch (err) {
      console.log(err);
      alert("Error adding listing ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base">New Food Listing</h3>
            <p className="text-xs text-gray-400 mt-0.5">Help feed someone today</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          >
            ×
          </button>
        </div>

        {/* Form Fields */}
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">
              Food Name *
            </label>
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
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">
                Quantity *
              </label>
              <input
                type="number"
                placeholder="0"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div className="w-28">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">
                Unit
              </label>
              <select
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
              >
                {["kg", "lbs", "pcs", "litres", "portions"].map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
            >
              {categories.filter((c) => c !== "All").map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">
              Expires At *
            </label>
            <input
              type="datetime-local"
              value={form.expires}
              onChange={(e) => setForm({ ...form, expires: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block uppercase tracking-wide">
              Notes
            </label>
            <textarea
              placeholder="Allergens, storage requirements, pickup instructions..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!form.name || !form.qty || !form.expires}
            className="flex-1 bg-[#664930] hover:bg-[#5a3d24] disabled:opacity-40 disabled:cursor-not-allowed text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-md shadow-[#664930]"
          >
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}