import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck, Heart } from "lucide-react";
import { COMPANY_INFO, TARIFFS } from "@/config/services";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacts" className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-teal-500/40 shadow-sm bg-white shrink-0 group-hover:border-teal-400 transition-colors">
                <Image
                  src="/images/logo.jpg"
                  alt={COMPANY_INFO.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-white text-xl leading-none tracking-tight">
                  Kelinka<span className="text-teal-400">PRO</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-1">
                  Клининговая компания
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              {COMPANY_INFO.baseStatement}
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold bg-teal-950/60 border border-teal-800/60 px-3 py-2 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>100% гарантия безопасности личных вещей</span>
            </div>
          </div>

          {/* Tariffs Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Виды уборок и цены
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {TARIFFS.map((t) => (
                <li key={t.id}>
                  <a
                    href="#tariffs"
                    className="hover:text-teal-400 transition-colors flex items-center justify-between"
                  >
                    <span>{t.name}</span>
                    <span className="text-xs text-slate-500 font-semibold">{t.priceLabel}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Навигация
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#tariffs" className="hover:text-teal-400 transition-colors">
                  Тарифы
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-teal-400 transition-colors">
                  Онлайн калькулятор
                </a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-teal-400 transition-colors">
                  Преимущества
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-teal-400 transition-colors">
                  До и После
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-teal-400 transition-colors">
                  Вопросы и ответы
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts Column */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Контакты и связь
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex items-center gap-2.5 text-base font-bold text-white hover:text-teal-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.workingHours}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{COMPANY_INFO.city}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>

            <div className="flex items-center gap-2.5 mt-5">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 hover:bg-emerald-900/60 transition-colors inline-flex items-center gap-2 text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Написать в WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {COMPANY_INFO.name}. Все права защищены.
          </div>
          <div className="flex items-center gap-1">
            <span>Профессиональная клининговая компания в Казахстане</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
