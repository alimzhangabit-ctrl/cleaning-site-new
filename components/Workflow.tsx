import { FileText, Calculator, Sparkles, CheckCircle2 } from "lucide-react";
import { WORKFLOW_STEPS } from "@/config/services";

export default function Workflow() {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FileText className="w-6 h-6 text-teal-600" />;
      case 1:
        return <Calculator className="w-6 h-6 text-teal-600" />;
      case 2:
        return <Sparkles className="w-6 h-6 text-teal-600" />;
      case 3:
        return <CheckCircle2 className="w-6 h-6 text-teal-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="workflow" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            Прозрачный процесс
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Как мы работаем: 4 простых шага к идеальной чистоте
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Никаких предоплат и рисков. Всё прозрачно от первой минуты до финального рукопожатия.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-white rounded-2xl p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-teal-300 transition-all duration-200"
            >
              <div>
                {/* Step number badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
                    {getStepIcon(idx)}
                  </div>
                  <span className="text-3xl font-black text-slate-200 group-hover:text-teal-500/40 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Step Indicator */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-teal-700">
                <span>Шаг {idx + 1} из 4</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
