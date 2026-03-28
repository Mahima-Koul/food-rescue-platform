export default function ImpactCard() {
  return (
    <div className="bg-gradient-to-br from-[#8B735C] to-[#5C4A3D] rounded-2xl p-5 text-white">
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
  );
}