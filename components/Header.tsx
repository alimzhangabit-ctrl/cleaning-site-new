"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/config/services";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Тарифы", href: "#tariffs" },
    { name: "Калькулятор", href: "#calculator" },
    { name: "Преимущества", href: "#advantages" },
    { name: "До / После", href: "#before-after" },
    { name: "Процесс", href: "#workflow" },
    { name: "Вопросы", href: "#faq" },
    { name: "Контакты", href: "#contacts" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3"
          : "bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-teal-500/20 shadow-xs bg-white shrink-0 group-hover:border-teal-500 transition-colors">
              <Image
                src="/images/logo.jpg"
                alt={COMPANY_INFO.name}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-lg leading-none tracking-tight">
                Kelinka<span className="text-teal-600">PRO</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                Клининговая компания
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact & CTA buttons */}
          <div className="hidden md:flex items-center gap-5">
            <div className="text-right">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center justify-end gap-1.5 font-bold text-slate-900 hover:text-teal-600 transition-colors text-base"
              >
                <Phone className="w-4 h-4 text-teal-600" />
                {COMPANY_INFO.phone}
              </a>
              <div className="flex items-center justify-end gap-1 text-xs text-slate-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping mr-0.5" />
                <span>Звоните 24/7</span>
              </div>
            </div>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-emerald-600 bg-emerald-50 border border-emerald-100"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-6 shadow-xl">
          <nav className="flex flex-col gap-3 py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 py-1.5 hover:text-teal-600 border-b border-slate-100 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="font-bold text-slate-900 text-lg flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-teal-600" />
                  {COMPANY_INFO.phone}
                </a>
                <p className="text-xs text-slate-500">Круглосуточно • Без выходных</p>
              </div>
            </div>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold text-center shadow-md shadow-emerald-500/20 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Написать в WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
