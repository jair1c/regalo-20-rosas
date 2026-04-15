import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Configuración de Metadata para la vista previa en redes sociales y WhatsApp
export const metadata: Metadata = {
  title: "20 Rosas para Aracely 🌹",
  description: "Un detalle especial para una persona increíble. Abre el baúl a la medianoche del 20 de abril.",
  openGraph: {
    title: "20 Rosas para Aracely 🌹",
    description: "Un detalle especial para una persona increíble. Abre el baúl a la medianoche.",
    url: "https://20-rosas.vercel.app/", // Podrás actualizar esto luego
    siteName: "Regalo 20 Rosas",
    images: [
      {
        url: "/rosas.png",
        width: 1200,
        height: 630,
        alt: "20 Rosas Rojas para Aracely",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Agregamos suppressHydrationWarning para evitar errores por extensiones del navegador
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}