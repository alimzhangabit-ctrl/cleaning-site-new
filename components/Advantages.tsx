import {
  ShieldCheck,
  Sparkles,
  Award,
  PhoneCall,
  CheckCircle,
  Lock,
  ThumbsUp,
  PackageCheck,
} from "lucide-react";
import { ADVANTAGES, COMPANY_INFO } from "@/config/services";

export default function Advantages() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "SprayCan":
        return <PackageCheck className="w-7 h-7 text-teal-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-7 h-7 text-teal-600" />;
      case "CheckCircle2":
        return <Award className="w-7 h-7 text-teal-600" />;
      case "Clock":
        return <PhoneCall className="w-7 h-7 text-teal-600" />;
      default:
        return <Sparkles className="w-7 h-7 text-teal-600" />;
    }
  };

  return (
    <section id="advantages" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            Надежность и ответственность
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Почему клиенты доверяют уборку именно нам
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Мы берем на себя все хлопоты по наведению безупречной чистоты, гарантируя полную сохранность вашего дома.
          </p>
        </div>

        {/* Advantages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          {ADVANTAGES.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start gap-5 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-teal-100/70 transition-all duration-200">
                {getIcon(adv.iconName)}
              </div>
              <div className="flex-1">
                <div className="inline-block text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md mb-2">
                  {adv.badge}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 leading-snug">
                  {adv.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Trust Special Guarantee Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4 border border-teal-500/30">
                <Lock className="w-3.5 h-3.5" />
                <span>Официальные гарантии безопасности</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                100% материальная ответственность и сохранность вещей
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Мы понимаем ваши опасения, когда в дом приходят незнакомые люди. Поэтому каждый наш клинер проходит жесткий отбор службы безопасности, официальное оформление и проверку рекомендаций. Вы можете спокойно оставить ключи и уехать по делам.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Проверенные клинеры</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Гипоаллергенная химия</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Оплата по факту приемки</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center w-full max-w-xs">
                <div className="text-3xl font-black text-teal-400 mb-1">24 / 7</div>
                <div className="text-sm font-semibold text-white mb-3">
                  {COMPANY_INFO.workingHours}
                </div>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="w-full py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
