"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import Papa from "papaparse"
import { DownloadIcon } from "lucide-react"
import { toast } from "sonner"
import { getTotalVentas } from "@/actions";
import { FormatoMoneda } from "@/lib/FormatoMoneda";

export const ButtonExportCsvVentas = ({ userId }: { userId: number }) => {
  const [isExporting, setIsExporting] = useState(false)

  async function downloadCsv() {
    setIsExporting(true);

    const response = await getTotalVentas(userId); // Llamar Server Action directamente
    if (!response.ok || !response.ventas) {
      toast.error(response.message || "Error al obtener las ventas");
      setIsExporting(false);
      return;
    }

    const ventas = response.ventas;

    if (ventas.length === 0) {
      toast.warning("No hay ventas para exportar");
      setIsExporting(false);
      return;
    }

    try {
      const processedData = ventas.map((item) => ({
        ID: item.id,
        Cliente: item.Cliente.nombre,
        MétodoPago: item.metodoPago,
        Fecha: new Date(item.fecha).toLocaleString(),
        Total: FormatoMoneda(item.precioTotal)
      }));

      // Generar CSV con PapaParse
      const csvContent = Papa.unparse(processedData, {
        delimiter: ";", // Para Excel en español
        header: true,
        quotes: true,
      });

      // Agregar BOM para caracteres UTF-8 en Excel
      const BOM = "\uFEFF";
      const csvContentWithBOM = BOM + csvContent;

      // Crear y descargar el archivo
      const blob = new Blob([csvContentWithBOM], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ventas.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exportando CSV:", error);
      toast.error("Error al exportar CSV");
    } finally {
      setIsExporting(false);
    }
  }


  return (
    <Button
      type="button"
      variant="outline"
      title="Exportar CSV"
      onClick={downloadCsv}
      disabled={isExporting}
    >
      {isExporting ? "Exportando..." : "Exportar CSV"} <DownloadIcon className="ml-2" size={16} />
    </Button>
  )
}

