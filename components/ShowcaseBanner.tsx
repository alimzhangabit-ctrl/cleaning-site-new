import Image from "next/image";
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function ShowcaseBanner() {
  const highlights = [
    {
      title: "Моем окна и рамы",
      desc: "Идеальная прозрачность без разводов, мойка откосов и подоконников",
      icon: "🪟",
    },
    {
      title: "Протираем все поверхности",
      desc: "Тщательное обеспыливание мебели, техники, розеток и плинтусов",
      icon: "✨",
    },
    {
      title: "Химчистка мебели",
      desc: "Бережная очистка обивки диванов, стульев и ковровых покрытий",
      icon: "🛋️",
    },
    {
      title: "Глубокая мойка пола",
      desc: "Устранение въевшихся пятен, строительных следов и полировка покрытий",
      icon: "🧹",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Стандарты CleanPro</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Комплексный клининг каждого сантиметра
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            В квартирах, домах и офисных пространствах мы соблюдаем строгий технологический регламент очистки всех зон и поверхностей.
          </p>
        </div>

        {/* Visual Banner Container */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-50 mb-10 group">
          {/* Image shown in full original quality without cropping */}
          <Image
            src="/images/service-showcase.png"
            alt="Комплексная уборка офисов и жилых помещений"
            width={1920}
            height={900}
            priority
            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Bottom subtle gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="text-white">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 bg-teal-950/80 border border-teal-700/50 px-2.5 py-1 rounded-lg mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% контроль по чек-листу</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold">
                Готовы к работе любой сложности в день обращения
              </h3>
            </div>

            <a
              href="#calculator"
              className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>Рассчитать стоимость</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 Feature Cards corresponding to image callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-300 transition-all flex items-start gap-4"
            >
              <div className="text-2xl shrink-0 p-2 bg-slate-50 rounded-xl border border-slate-100">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
