import { pickupSchedule } from "../../../constants";
export default function PickupSchedule() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-bold text-gray-800 text-sm mb-4">📅 Today's Pickup Schedule</h3>
      <div className="space-y-3">
        {pickupSchedule.map((p, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="text-xs font-bold text-gray-400 w-14 pt-0.5 flex-shrink-0">
              {p.time}
            </div>
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
  );
}