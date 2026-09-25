import { Sparkles, ShieldCheck, HardHat, Building2, Check, ArrowRight } from "lucide-react";
import { TARIFFS, Tariff } from "@/config/services";

interface TariffCardsProps {
  onSelectTariff: (tariffId: string) => void;
}

export default function TariffCards({ onSelectTariff }: TariffCardsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-teal-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-teal-600" />;
      case "HardHat":
        return <HardHat className="w-6 h-6 text-amber-600" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-sky-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="tariffs" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            Прозрачный прайс-лист
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Все виды уборок и фиксированные тарифы
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Никаких скрытых платежей: вы платите строго за квадратный метр и только после завершения и вашей личной приемки работы.
          </p>
        </div>

        {/* Tariffs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TARIFFS.map((tariff: Tariff) => {
            const isPopular = tariff.popular;

            return (
              <div
                key={tariff.id}
                className={`relative flex flex-col bg-white rounded-2xl transition-all duration-300 ${
                  isPopular
                    ? "ring-2 ring-teal-500 shadow-xl shadow-teal-500/10 lg:-translate-y-2"
                    : "border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300"
                }`}
              >
                {/* Popular or Status Badge */}
                {tariff.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs whitespace-nowrap ${
                        isPopular
                          ? "bg-teal-600 text-white"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      {tariff.badge}
                    </span>
                  </div>
                )}

                <div className="p-6 pb-0 flex-1">
                  {/* Icon & Title */}
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                    {getIcon(tariff.icon)}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {tariff.name}
                  </h3>

                  <p className="text-xs text-slate-500 min-h-[36px] mb-4">
                    {tariff.shortDesc}
                  </p>

                  {/* Price */}
                  <div className="py-4 border-y border-slate-100 mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 tracking-tight">
                        {tariff.priceLabel}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {tariff.unit}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-600">
                    {tariff.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer CTA Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectTariff(tariff.id)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                      isPopular
                        ? "bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20"
                        : "bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700"
                    }`}
                  >
                    <span>Рассчитать стоимость</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note banner under tariffs */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
            <span>
              В стоимость каждого тарифа уже включены <strong>профессиональная химия</strong>, расходные материалы и выезд клинеров.
            </span>
          </div>
          <a
            href="#calculator"
            className="text-sm font-bold text-teal-600 hover:text-teal-700 whitespace-nowrap inline-flex items-center gap-1"
          >
            Перейти к калькулятору →
          </a>
        </div>

      </div>
    </section>
  );
}
