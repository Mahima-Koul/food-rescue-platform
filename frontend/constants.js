export const initialListings = [
  { id: 1, name: "Paneer Butter Masala", qty: "8 kg", expires: "Today, 9:00 PM", category: "Cooked Meal", status: "active", claimed: false, ngo: null },
  { id: 2, name: "Tandoori Rotis", qty: "60 pcs", expires: "Today, 8:00 PM", category: "Bread", status: "claimed", claimed: true, ngo: "Akshaya Patra" },
  { id: 3, name: "Dal Tadka", qty: "12 kg", expires: "Today, 10:00 PM", category: "Cooked Meal", status: "active", claimed: false, ngo: null },
  { id: 4, name: "Mixed Salad", qty: "5 kg", expires: "Today, 7:30 PM", category: "Raw / Produce", status: "expired", claimed: false, ngo: null },
  { id: 5, name: "Raita", qty: "4 kg", expires: "Tomorrow, 8:00 AM", category: "Dairy", status: "active", claimed: false, ngo: null },
];

export const stats = [
  { label: "Meals Donated", value: "1,248", delta: "+12 this week", icon: "🍽️", color: "from-emerald-500 to-teal-600" },
  { label: "Active Listings", value: "3", delta: "2 expiring soon", icon: "📋", color: "from-amber-500 to-orange-500" },
  { label: "NGOs Served", value: "14", delta: "+2 this month", icon: "🤝", color: "from-sky-500 to-blue-600" },
  { label: "Food Saved (kg)", value: "892", delta: "+34 kg today", icon: "♻️", color: "from-violet-500 to-purple-600" },
];

export const categories = ["All", "Cooked Meal", "Bread", "Raw / Produce", "Dairy", "Dessert", "Beverages"];

export const recentActivity = [
  { time: "2h ago", text: "Akshaya Patra claimed your Tandoori Rotis listing", type: "claimed" },
  { time: "5h ago", text: "New listing 'Raita' published successfully", type: "published" },
  { time: "Yesterday", text: "Robin Hood Army picked up Dal Makhani (10 kg)", type: "pickup" },
  { time: "2 days ago", text: "Listing 'Mixed Salad' expired without a claim", type: "expired" },
];

export const pickupSchedule = [
  { time: "7:30 PM", ngo: "Akshaya Patra", item: "Tandoori Rotis", confirmed: true },
  { time: "9:00 PM", ngo: "Pending", item: "Paneer Butter Masala", confirmed: false },
];

export const ngoList = [
  { name: "Akshaya Patra", area: "Pan India", meals: 420, verified: true },
  { name: "Robin Hood Army", area: "Bengaluru", meals: 310, verified: true },
  { name: "Feeding India", area: "South India", meals: 200, verified: false },
  { name: "No Food Waste", area: "Bengaluru", meals: 180, verified: true },
];

export const statusBadge = (status) => {
  const map = {
    active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    claimed: "bg-sky-100 text-sky-700 border-sky-200",
    expired: "bg-red-100 text-red-600 border-red-200",
  };
  return map[status] || "";
};

export const foodIcon = (category) => {
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

export const activityIcon = (type) => {
  const map = { claimed: "🤝", published: "✅", pickup: "🚚", expired: "⏰" };
  return map[type] || "📌";
};