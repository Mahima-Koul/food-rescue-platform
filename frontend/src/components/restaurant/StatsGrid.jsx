import { stats } from "../../../constants";
export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-lg mb-3`}>
            {s.icon}
          </div>
          <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          <p className="text-xs font-medium text-gray-500 mt-0.5">{s.label}</p>
          <p className="text-xs text-emerald-600 mt-1.5 font-medium">{s.delta}</p>
        </div>
      ))}
    </div>
  );
}