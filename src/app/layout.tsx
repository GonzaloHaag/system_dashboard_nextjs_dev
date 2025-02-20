import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight:["400","500","600","700","800"],
  style:["normal"],
  subsets:["latin"],
  display:"swap"
})
export const metadata: Metadata = {
  title : {
    template:'%s | Sistema de control',
    default : 'Sistema de control'
  },
  description: "Optimiza la gestión de stock e inventarios con nuestro sistema intuitivo y eficiente. Mantén el control total de tus productos, movimientos y existencias en tiempo real.",
  keywords: "control de stock, sistema de inventario, gestión de inventario, software de stock, administración de existencias, seguimiento de productos, control en tiempo real, gestión de almacenes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
        <Toaster position="top-center" duration={2500} />
      </body>
    </html>
  );
}
