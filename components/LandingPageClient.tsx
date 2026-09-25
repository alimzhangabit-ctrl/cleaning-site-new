"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TariffCards from "@/components/TariffCards";
import Calculator from "@/components/Calculator";
import Advantages from "@/components/Advantages";
import ShowcaseBanner from "@/components/ShowcaseBanner";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Workflow from "@/components/Workflow";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import QuickCallModal from "@/components/QuickCallModal";

type CalculationData = {
  tariffId: string;
  tariffName: string;
  area: number;
  price: number;
  priceRange?: string;
};

export default function LandingPageClient() {
  const [selectedTariffId, setSelectedTariffId] = useState<string>("general");
  const [calculationData, setCalculationData] = useState<CalculationData | null>(null);
  const [isQuickCallOpen, setIsQuickCallOpen] = useState(false);

  const handleSelectTariffFromCards = (tariffId: string) => {
    setSelectedTariffId(tariffId);
    const calcSection = document.getElementById("calculator");
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleApplyCalculation = (data: CalculationData) => {
    setCalculationData(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Sticky Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Offer & USP */}
        <Hero onOpenQuickCall={() => setIsQuickCallOpen(true)} />

        {/* 2. Tariffs & Fixed Pricing Cards */}
        <TariffCards onSelectTariff={handleSelectTariffFromCards} />

        {/* 3. Interactive Online Cost Calculator */}
        <Calculator
          selectedTariffId={selectedTariffId}
          onSelectTariff={setSelectedTariffId}
          onApplyCalculation={handleApplyCalculation}
        />

        {/* 4. Advantages & Security Guarantees */}
        <Advantages />

        {/* 5. Showcase Banner */}
        <ShowcaseBanner />

        {/* 6. Interactive Before / After Comparison Slider */}
        <BeforeAfterSlider />

        {/* 7. Work Process (How it works - 4 steps) */}
        <Workflow />

        {/* 8. Contact CTA (WhatsApp + Email) */}
        <LeadForm
          initialTariffId={calculationData?.tariffId}
          initialArea={calculationData?.area}
          initialPriceEstimate={
            calculationData?.priceRange ?? calculationData?.price.toLocaleString("ru-RU")
          }
        />

        {/* 9. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* 10. Rich Footer */}
      <Footer />

      {/* Floating CTA Widget (WhatsApp only) */}
      <FloatingCTA onOpenQuickCall={() => setIsQuickCallOpen(true)} />

      <QuickCallModal
        isOpen={isQuickCallOpen}
        onClose={() => setIsQuickCallOpen(false)}
      />
    </div>
  );
}
