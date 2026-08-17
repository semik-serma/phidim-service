import { Zap, ShieldCheck, Wifi, Wind, Tv, Droplet, Monitor, Wrench } from "lucide-react";
import { SERVICE_CATEGORIES } from "../data/services";

export const PopularCategories = ({ onSelectCategory }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-7 h-7 text-amber-500" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-7 h-7 text-emerald-600" />;
      case "Wifi":
        return <Wifi className="w-7 h-7 text-blue-600" />;
      case "Wind":
        return <Wind className="w-7 h-7 text-teal-600" />;
      case "Tv":
        return <Tv className="w-7 h-7 text-rose-600" />;
      case "Droplet":
        return <Droplet className="w-7 h-7 text-cyan-600" />;
      case "Monitor":
        return <Monitor className="w-7 h-7 text-purple-600" />;
      default:
        return <Wrench className="w-7 h-7 text-emerald-600" />;
    }
  };

  return (
    <section className="bg-slate-100/80 py-10 px-4 md:px-8 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#e02b6a] tracking-tight lowercase">
            popular service categories
          </h3>
          <div className="w-16 h-1 bg-[#e02b6a] mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {SERVICE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs hover:shadow-md hover:border-[#e02b6a]/40 transition-all cursor-pointer flex flex-col items-center text-center group transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-pink-50 flex items-center justify-center mb-3 transition-colors">
                {getIcon(cat.icon)}
              </div>
              <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#e02b6a] transition-colors line-clamp-2 leading-tight">
                {cat.name}
              </h4>
              <span className="text-[10px] text-gray-400 font-medium mt-1">
                {cat.count} Packages
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
