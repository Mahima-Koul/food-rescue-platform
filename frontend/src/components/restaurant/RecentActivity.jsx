import { recentActivity, activityIcon } from "../../../constants";

export default function RecentActivity() {
  return (
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
  );
}