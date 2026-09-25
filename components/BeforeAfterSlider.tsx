"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, MoveHorizontal, CheckCircle } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section id="before-after" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Результаты нашей работы</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Сравнение результатов: До и После уборки
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Передвигайте интерактивный бегунок влево и вправо, чтобы оценить качество удаления строительной пыли, въевшихся пятен и налета.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize bg-slate-900"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* "AFTER" (Clean Image - Base Layer) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/images/after-office.jpg"
                alt="Офис после профессиональной уборки"
                fill
                priority
                className="object-cover pointer-events-none"
              />
              {/* After badge */}
              <div className="absolute top-4 right-4 bg-teal-600/90 backdrop-blur-sm text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-md pointer-events-none z-10 flex items-center gap-1.5">
                <span>ПОСЛЕ УБОРКИ</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* "BEFORE" (Dirty Image - Clipped Layer) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <Image
                src="/images/before-office.jpg"
                alt="Офис до уборки"
                fill
                priority
                className="object-cover pointer-events-none"
              />
              {/* Before badge */}
              <div className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur-sm text-white text-xs font-black px-3.5 py-1.5 rounded-xl shadow-md pointer-events-none z-10">
                ДО УБОРКИ
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none -translate-x-1/2 flex items-center justify-center z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Circular drag button handle */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-2xl border-2 border-teal-600 flex items-center justify-center text-teal-700 pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>

            {/* Bottom floating hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-medium pointer-events-none z-10 flex items-center gap-2">
              <MoveHorizontal className="w-3.5 h-3.5 text-teal-400" />
              <span>Тяните бегунок для сравнения</span>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setSliderPosition(10)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sliderPosition <= 15
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Показать &quot;После&quot;
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sliderPosition > 35 && sliderPosition < 65
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Сравнение 50 / 50
            </button>
            <button
              onClick={() => setSliderPosition(90)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                sliderPosition >= 85
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Показать &quot;До&quot;
            </button>
          </div>

          {/* Key comparison facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 text-slate-600 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Очищение глубоких пор и швов плитки</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Удаление строительного налета без царапин</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Зеркальный блеск всех глянцевых поверхностей</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
