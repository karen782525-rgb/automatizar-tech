import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "automatizar.tech | Agencia de IA & Automatización",
  description: "Potenciamos tu equipo con Inteligencia Artificial. Asesorías, Apps, Seminarios y Servicios Audiovisuales con IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${jakarta.variable} font-sans antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
