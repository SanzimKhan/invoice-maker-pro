import { useState } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { Button } from "@/components/ui/button";
import { Printer, FileText } from "lucide-react";

export interface LineItem {
  id: string;
  description: string;
  isService: boolean;
  quantity: number;
  buyingPrice: number;
  sellingPrice: number;
  amount: number;
  profit: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  lineItems: LineItem[];
  discountPercent: number;
  taxRate: number;
  notes: string;
  previousProduct: string;
}

const Index = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    companyName: "BOT Engineers",
    companyAddress: "1/10, North South Road, A Block, Banasree",
    companyPhone: "",
    companyEmail: "",
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",
    lineItems: [
      { id: "1", description: "", isService: false, quantity: 1, buyingPrice: 0, sellingPrice: 0, amount: 0, profit: 0 }
    ],
    discountPercent: 0,
    taxRate: 0,
    notes: "",
    previousProduct: "",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card print:hidden">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">BOT Engineers Invoice</h1>
          </div>
          <Button onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            Print Invoice
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="print:hidden">
            <InvoiceForm invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
          </div>
          <div className="lg:sticky lg:top-8 h-fit">
            <InvoicePreview invoiceData={invoiceData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
