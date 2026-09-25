"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, Phone, User, Home, Shield, Sparkles } from "lucide-react";
import { TARIFFS, COMPANY_INFO } from "@/config/services";

interface LeadFormProps {
  initialTariffId?: string;
  initialArea?: number;
  initialPriceEstimate?: string;
}

export default function LeadForm({
  initialTariffId,
  initialArea,
  initialPriceEstimate,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceId, setServiceId] = useState(initialTariffId || "general");
  const [area, setArea] = useState<string>(initialArea ? String(initialArea) : "65");
  const [comment, setComment] = useState("");
  const [botField, setBotField] = useState(""); // honeypot

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ leadId: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client validation
    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Пожалуйста, введите ваше имя (не менее 2 символов)");
      return;
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) {
      setErrorMessage("Пожалуйста, укажите корректный номер телефона (например, +7 777 123 45 67)");
      return;
    }

    setLoading(true);

    try {
      const selectedTariff = TARIFFS.find((t) => t.id === serviceId);

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          serviceId,
          serviceName: selectedTariff ? selectedTariff.name : serviceId,
          area: area ? Number(area) : undefined,
          estimatedPrice: initialPriceEstimate,
          comment: comment.trim(),
          botField,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Не удалось отправить заявку. Попробуйте еще раз.");
      }

      setSuccessData({
        leadId: data.leadId || "LEAD-SUCCESS",
        message: data.message || "Заявка успешно принята!",
      });

      // Reset form
      setName("");
      setPhone("");
      setComment("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Произошла ошибка при отправке заявки";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="order" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Быстрое оформление • 0 тенге предоплаты</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Заказать профессиональную уборку
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Оставьте контактные данные — наш менеджер перезвонит в течение 5 минут для подтверждения времени и точного расчета.
            </p>
          </div>

          {/* Form Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            {successData ? (
              <div className="bg-teal-950/80 border border-teal-500/40 rounded-2xl p-8 text-center animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500 flex items-center justify-center mx-auto mb-4 text-teal-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Спасибо! Заявка #{successData.leadId} принята
                </h3>
                <p className="text-slate-300 text-sm mb-6">
                  {successData.message} Наш специалист уже готовит расчет и свяжется с вами по указанному номеру.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccessData(null)}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-colors"
                >
                  Отправить еще одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot anti-spam */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="botField"
                    tabIndex={-1}
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {errorMessage && (
                  <div className="flex items-center gap-2.5 p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Service & Area row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Вид уборки
                    </label>
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      {TARIFFS.map((tariff) => (
                        <option key={tariff.id} value={tariff.id} className="bg-slate-900 text-white">
                          {tariff.name} ({tariff.priceLabel}/{tariff.unit})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Площадь (кв.м)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={10}
                        max={1000}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Например, 65"
                        className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">
                        м²
                      </span>
                    </div>
                  </div>
                </div>

                {/* Name & Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Ваше имя <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Алексей"
                        className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Номер телефона <span className="text-teal-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (700) 000-00-00"
                        className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Комментарий / Пожелания (по желанию)
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Например: удобное время выезда, наличие домашних животных, особенности ремонта..."
                    className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                {/* Submit button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Отправляем заявку...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Отправить заявку на расчет</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust footnote */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 text-xs text-slate-400 border-t border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-teal-400 shrink-0" />
                    <span>Гарантируем безопасность личных вещей и данных</span>
                  </div>
                  <div>Оплата строго после вашей проверки работы</div>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
