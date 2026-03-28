import { ngoList } from "../../../constants";
export default function NGOGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {ngoList.map((n) => (
        <div
          key={n.name}
          className="bg-[#EDE7E1] rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-2xl">
            🤝
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-gray-800 text-sm">{n.name}</p>
              {n.verified && (
                <span className="text-sky-500 text-xs font-medium">✔ Verified</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{n.area}</p>
            <p className="text-xs text-emerald-600 font-medium mt-2">{n.meals} meals collected</p>
          </div>
        </div>
      ))}
    </div>
  );
}