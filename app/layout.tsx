import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piscilago Admin Dashboard",
  description: "Panel analítico de aforo, reservas y flujo de datos del parque Piscilago.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-200 text-slate-900">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>
        {children}
      </body>
    </html>
  );
}
