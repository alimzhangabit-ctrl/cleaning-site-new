"use client";

import { useState, useMemo } from "react";
import { Calculator as CalcIcon, Check, ArrowRight, Sparkles, Shield, Info } from "lucide-react";
import { TARIFFS } from "@/config/services";

interface CalculatorProps {
  selectedTariffId: string;
  onSelectTariff: (id: string) => void;
  onApplyCalculation: (data: {
    tariffId: string;
    tariffName: string;
    area: number;
    price: number;
    priceRange?: string;
  }) => void;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

const ADD_ONS: AddOn[] = [
  { id: "windows", name: "Мойка окон (стандарт)", price: 5000 },
  { id: "oven", name: "Очистка духовки от нагара", price: 4000 },
  { id: "fridge", name: "Мытье и дезинфекция холодильника", price: 3500 },
  { id: "balcony", name: "Уборка балкона / лоджии", price: 6000 },
];

export default function Calculator({
  selectedTariffId,
  onSelectTariff,
  onApplyCalculation,
}: CalculatorProps) {
  const [area, setArea] = useState<number>(65);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const activeTariff = useMemo(() => {
    return TARIFFS.find((t) => t.id === selectedTariffId) || TARIFFS[0];
  }, [selectedTariffId]);

  const quickAreas = [35, 55, 75, 100, 150];

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addOnsTotal = useMemo(() => {
    return selectedAddOns.reduce((sum, addOnId) => {
      const item = ADD_ONS.find((a) => a.id === addOnId);
      return sum + (item ? item.price : 0);
    }, 0);
  }, [selectedAddOns]);

  const calculation = useMemo(() => {
    if (activeTariff.id === "renovation") {
      const minBase = 600 * area;
      const maxBase = 700 * area;
      return {
        isRange: true,
        minTotal: minBase + addOnsTotal,
        maxTotal: maxBase + addOnsTotal,
        formattedTotal: `${(minBase + addOnsTotal).toLocaleString("ru-RU")} – ${(
          maxBase + addOnsTotal
        ).toLocaleString("ru-RU")} тг`,
        basePriceMin: minBase,
        basePriceMax: maxBase,
      };
    } else {
      const base = activeTariff.pricePerSqM * area;
      const total = base + addOnsTotal;
      return {
        isRange: false,
        minTotal: total,
        maxTotal: total,
        formattedTotal: `${total.toLocaleString("ru-RU")} тг`,
        basePrice: base,
      };
    }
  }, [activeTariff, area, addOnsTotal]);

  const handleBook = () => {
    onApplyCalculation({
      tariffId: activeTariff.id,
      tariffName: activeTariff.name,
      area,
      price: calculation.minTotal,
      priceRange: calculation.isRange ? calculation.formattedTotal : undefined,
    });

    // Smooth scroll to lead form
    const formElement = document.getElementById("order");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            <CalcIcon className="w-3.5 h-3.5" />
            <span>Калькулятор стоимости</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Рассчитайте точную стоимость уборки онлайн
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Выберите желаемый тип уборки и укажите площадь вашего помещения для моментального расчета.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg shadow-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Controls Side */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              {/* Step 1: Tariff Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  1. Выберите вид уборки
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TARIFFS.map((tariff) => {
                    const isSelected = tariff.id === activeTariff.id;
                    return (
                      <button
                        key={tariff.id}
                        type="button"
                        onClick={() => onSelectTariff(tariff.id)}
                        className={`p-4 rounded-2xl text-left border transition-all duration-200 relative ${
                          isSelected
                            ? "bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-xs"
                            : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-900 text-sm">
                            {tariff.name}
                          </span>
                          <span
                            className={`text-xs font-black px-2 py-0.5 rounded-full ${
                              isSelected
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {tariff.priceLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {tariff.shortDesc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Area slider & input */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="area-input" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    2. Площадь помещения (кв.м)
                  </label>
                  <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-xl px-3 py-1.5 shadow-xs">
                    <input
                      id="area-input"
                      type="number"
                      min={10}
                      max={500}
                      value={area}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setArea(Math.max(10, Math.min(500, val)));
                      }}
                      className="w-16 text-right font-black text-lg text-teal-700 focus:outline-none"
                    />
                    <span className="text-sm text-slate-500 font-medium">м²</span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={15}
                  max={300}
                  step={1}
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />

                {/* Quick Area Chips */}
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="text-xs text-slate-500 font-medium mr-1">Популярно:</span>
                  {quickAreas.map((sqm) => (
                    <button
                      key={sqm}
                      type="button"
                      onClick={() => setArea(sqm)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                        area === sqm
                          ? "bg-teal-600 border-teal-600 text-white font-bold"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {sqm} м²
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Optional Add-ons */}
              <div>
                <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  3. Дополнительные опции (по желанию)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ADD_ONS.map((addOn) => {
                    const isChecked = selectedAddOns.includes(addOn.id);
                    return (
                      <button
                        key={addOn.id}
                        type="button"
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-left text-xs transition-all ${
                          isChecked
                            ? "bg-teal-50/60 border-teal-400 text-teal-900"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked
                                ? "bg-teal-600 border-teal-600 text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="font-medium">{addOn.name}</span>
                        </div>
                        <span className="font-bold text-slate-900 whitespace-nowrap ml-2">
                          +{addOn.price.toLocaleString("ru-RU")} тг
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Calculation Summary Side */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-teal-100 rounded-2xl p-6 sm:p-7 shadow-sm">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <h3 className="text-base font-bold text-slate-900">Итоговый расчет</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                    Без предоплаты
                  </span>
                </div>

                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-slate-600">
                    <span>Тариф:</span>
                    <span className="font-bold text-slate-900">{activeTariff.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Базовая ставка:</span>
                    <span className="font-medium text-slate-800">
                      {activeTariff.priceLabel} {activeTariff.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Расчетная площадь:</span>
                    <span className="font-bold text-slate-900">{area} м²</span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-100">
                      <span>Доп. услуги ({selectedAddOns.length}):</span>
                      <span className="font-medium text-teal-700">
                        +{addOnsTotal.toLocaleString("ru-RU")} тг
                      </span>
                    </div>
                  )}
                </div>

                {activeTariff.id === "renovation" && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 text-xs mb-6">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Для уборки после ремонта цена составляет 600–700 тг/м² и зависит от степени запыленности и строительных загрязнений.
                    </span>
                  </div>
                )}

                {/* Total Price Block */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 mb-6 text-center">
                  <div className="text-xs text-slate-300 uppercase tracking-wider mb-1 font-semibold">
                    Ориентировочная стоимость:
                  </div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-teal-300">
                    {calculation.formattedTotal}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Оплата строго после вашей приемки выполненной работы
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div>
                <button
                  type="button"
                  onClick={handleBook}
                  className="w-full py-4 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Заказать уборку по этому расчету</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500 font-medium">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Гарантируем сохранность всех ваших вещей</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
