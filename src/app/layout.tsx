import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Configuración de Metadata para la vista previa en redes sociales y WhatsApp
export const metadata: Metadata = {
  title: "20 Rosas",
  description: "Un detalle especial para una persona increíble. Abre el baúl a la medianoche del 20 de abril.",
  
  // 1. Le decimos a Next.js cuál es el dominio principal (Súper importante)
  metadataBase: new URL("https://20-rosas.vercel.app"), 

  openGraph: {
    title: "20 Rosas",
    description: "Un detalle especial para una persona increíble. Abre el baúl a la medianoche del 20 de abril.",
    url: "https://20-rosas.vercel.app/", 
    siteName: "Regalo 20 Rosas",
    images: [
      {
        // 2. Usamos la ruta ABSOLUTA para que WhatsApp no se pierda
        url: "https://20-rosas.vercel.app/rosas.png",
        width: 1200,
        height: 630,
        alt: "20 Rosas Rojas",
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