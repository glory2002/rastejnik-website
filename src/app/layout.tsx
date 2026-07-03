import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const adys = localFont({
  src: [
    {
      path: "../fonts/ADYS-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ADYS-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/ADYS-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-adys",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Растежник — Помагаме на децата да разцъфтят",
  description:
    "Образователна платформа за родители и специалисти, посветени на първите години от живота на детето.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${adys.variable} font-sans`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
