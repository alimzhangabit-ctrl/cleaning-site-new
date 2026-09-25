import Image from "next/image";
import {
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Calculator,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import { COMPANY_INFO } from "@/config/services";

interface HeroProps {
  onOpenQuickCall: () => void;
}

export default function Hero({ onOpenQuickCall }: HeroProps) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 hero-gradient overflow-hidden">
      {/* Background decoration circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-teal-200/30 to-sky-200/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Offer, Texts, and CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs sm:text-sm font-semibold mb-5 shadow-xs">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>{COMPANY_INFO.badge} • Алматы и область</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
              Профессиональная уборка <br className="hidden sm:inline" />
              квартир, домов и помещений
            </h1>

            {/* Mandatory Base Text from Requirements */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-6 font-medium">
              {COMPANY_INFO.baseStatement}
            </p>

            {/* Price anchor highlight banner */}
            <div className="w-full bg-white/90 backdrop-blur-xs rounded-2xl p-4 sm:p-5 border border-teal-100 shadow-sm mb-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
                <div className="border-r border-slate-100 last:border-0 pr-2">
                  <div className="text-xs text-slate-500 font-medium">Влажная</div>
                  <div className="text-base sm:text-lg font-bold text-teal-700">250 тг<span className="text-xs text-slate-400 font-normal">/м²</span></div>
                </div>
                <div className="border-r border-slate-100 last:border-0 pr-2">
                  <div className="text-xs text-slate-500 font-medium">Генеральная</div>
                  <div className="text-base sm:text-lg font-bold text-teal-700">400 тг<span className="text-xs text-slate-400 font-normal">/м²</span></div>
                </div>
                <div className="border-r border-slate-100 last:border-0 pr-2">
                  <div className="text-xs text-slate-500 font-medium">После ремонта</div>
                  <div className="text-base sm:text-lg font-bold text-teal-700">600–700 тг<span className="text-xs text-slate-400 font-normal">/м²</span></div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Офисы и адм.</div>
                  <div className="text-base sm:text-lg font-bold text-teal-700">300 тг<span className="text-xs text-slate-400 font-normal">/м²</span></div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calculator className="w-5 h-5" />
                <span>Рассчитать стоимость</span>
              </a>

              <button
                onClick={onOpenQuickCall}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-xs hover:border-slate-300 transition-all hover:-translate-y-0.5"
              >
                <PhoneCall className="w-5 h-5 text-teal-600" />
                <span>Заказать звонок</span>
              </button>
            </div>

            {/* Core Trust Badges from Prompts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-200/80 w-full">
              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                </div>
                <span>Гарантируем безопасность личных вещей!</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-teal-700" />
                </div>
                <span>Инвентарь и проф. химию везем с собой</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-teal-700" />
                </div>
                <span>Высокое качество и доступные цены</span>
              </div>

              <div className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-teal-700" />
                </div>
                <span>Звоните в любое удобное время! 24/7</span>
              </div>
            </div>

          </div>

          {/* Right Column: High Quality Vector Illustration & Stats */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-[500px] aspect-[6/5]">
              <Image
                src="/cleaning-hero-illustration.svg"
                alt="Профессиональная уборка помещений"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Quick floating review badge */}
            <div className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                4.9
              </div>
              <div>
                <div className="flex items-center text-amber-500 text-xs mb-0.5">
                  ★★★★★
                </div>
                <div className="text-xs font-bold text-slate-900">Более 500+ уборок</div>
                <div className="text-[11px] text-slate-500">100% оплата по факту</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
