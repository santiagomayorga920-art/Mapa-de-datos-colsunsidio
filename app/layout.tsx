import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { GlobalNav } from "./components/GlobalNav";

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
  description:
    "Panel analítico de aforo, reservas y flujo de datos del parque Piscilago.",
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
      <body className="relative flex min-h-full flex-col bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-slate-100">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-fuchsia-600/15 blur-[130px]" />
          <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-500/15 blur-[110px]" />
        </div>

        <GlobalNav />

        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
