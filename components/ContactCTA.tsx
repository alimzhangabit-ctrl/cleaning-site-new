import { MessageCircle, Mail, Sparkles, Shield, ArrowRight, PhoneCall } from "lucide-react";
import { COMPANY_INFO } from "@/config/services";

export default function ContactCTA() {
  return (
    <section id="order" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">

          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Связаться с нами — моментально</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Закажите уборку прямо сейчас
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Напишите нам в WhatsApp или на почту — менеджер ответит в течение нескольких минут,
              проконсультирует и рассчитает точную стоимость уборки.
            </p>
          </div>

          {/* Contact buttons */}
          <div className="relative z-10 max-w-lg mx-auto flex flex-col sm:flex-row gap-4 mb-8">
            {/* WhatsApp Button */}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Написать в WhatsApp</span>
            </a>

            {/* Email Button */}
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=Заявка на уборку&body=Здравствуйте! Хотел(а) бы рассчитать стоимость уборки.`}
              className="flex-1 py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base flex items-center justify-center gap-3 border border-white/20 shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Mail className="w-5 h-5" />
              <span>Написать на почту</span>
            </a>
          </div>

          {/* Phone Number */}
          <div className="relative z-10 text-center mb-6">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2.5 text-xl sm:text-2xl font-black text-white hover:text-teal-300 transition-colors"
            >
              <PhoneCall className="w-5 h-5 text-teal-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <p className="text-xs text-slate-400 mt-1.5">
              {COMPANY_INFO.workingHours}
            </p>
          </div>

          {/* Trust footnote */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-700/50 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Гарантируем безопасность ваших личных вещей</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
            <div>Оплата строго после вашей приемки работы</div>
          </div>

        </div>

      </div>
    </section>
  );
}
