"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { COMPANY_INFO } from "@/config/services";

interface FloatingCTAProps {
  onOpenQuickCall: () => void;
}

export default function FloatingCTA({ onOpenQuickCall }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end">
      {/* WhatsApp Button */}
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
          Написать в WhatsApp
        </span>
      </a>

      {/* Quick Call Button with Pulse Ring */}
      <button
        onClick={onOpenQuickCall}
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white shadow-xl shadow-teal-600/35 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Заказать звонок"
      >
        <span className="absolute inset-0 rounded-full bg-teal-400 opacity-40 animate-ping -z-10" />
        <PhoneCall className="w-6 h-6 animate-subtle-pulse" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
          Заказать звонок 24/7
        </span>
      </button>
    </div>
  );
}
