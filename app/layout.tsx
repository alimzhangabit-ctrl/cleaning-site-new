import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "KelinkaPro — Профессиональная уборка квартир, домов и помещений в Алматы",
  description:
    "Клининговая компания: влажная уборка от 250 тг/м², генеральная 400 тг/м², после ремонта 600–700 тг/м², офисы 300 тг/м². Своя профессиональная химия и инвентарь. Гарантия безопасности вещей! Звоните 24/7.",
  keywords: [
    "клининг",
    "клининговая компания",
    "уборка квартир",
    "генеральная уборка",
    "уборка после ремонта",
    "уборка помещений",
    "мойка окон",
    "клининг Алматы",
  ],
  authors: [{ name: "KelinkaPro Expert" }],
  openGraph: {
    title: "KelinkaPro — Профессиональная клининговая компания",
    description:
      "Все виды уборок: влажная 250 тг, генеральная 400 тг, после ремонта 600–700 тг, офисы 300 тг/кв.м. Профессиональная химия, гарантия безопасности вещей!",
    type: "website",
    locale: "ru_KZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
