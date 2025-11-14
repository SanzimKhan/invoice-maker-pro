import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { InvoiceData } from "@/pages/Index";
import botEngineersLogo from "@/assets/bot-engineers-logo.png";

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

const InvoicePreview = ({ invoiceData }: InvoicePreviewProps) => {
  const subtotal = invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const discount = subtotal * (invoiceData.discountPercent / 100);
  const afterDiscount = subtotal - discount;
  const total = afterDiscount;
  const totalProfit = invoiceData.lineItems.reduce((sum, item) => sum + item.profit, 0);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <Card className="p-8 bg-card shadow-lg print:shadow-none print:border-none">
      {/* Header with Logo */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <img src={botEngineersLogo} alt="BOT Engineers" className="h-16 mb-2" />
          <h1 className="text-3xl font-bold text-invoice-header">INVOICE</h1>
        </div>
        <div className="text-sm text-muted-foreground text-right">
          <p className="font-semibold text-foreground">Invoice #: {invoiceData.invoiceNumber}</p>
          <p>Date: {formatDate(invoiceData.invoiceDate)}</p>
          <p>Due Date: {formatDate(invoiceData.dueDate)}</p>
          {invoiceData.previousProduct && (
            <p className="mt-2 text-xs">Ref: {invoiceData.previousProduct}</p>
          )}
        </div>
      </div>

      {/* Company and Client Info */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">From</h3>
          {invoiceData.companyName && (
            <p className="font-bold text-lg text-foreground mb-1">{invoiceData.companyName}</p>
          )}
          {invoiceData.companyAddress && (
            <p className="text-sm text-muted-foreground whitespace-pre-line">{invoiceData.companyAddress}</p>
          )}
          {invoiceData.companyPhone && (
            <p className="text-sm text-muted-foreground">{invoiceData.companyPhone}</p>
          )}
          {invoiceData.companyEmail && (
            <p className="text-sm text-muted-foreground">{invoiceData.companyEmail}</p>
          )}
        </div>
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Bill To</h3>
          {invoiceData.clientName && (
            <p className="font-bold text-lg text-foreground mb-1">{invoiceData.clientName}</p>
          )}
          {invoiceData.clientAddress && (
            <p className="text-sm text-muted-foreground whitespace-pre-line">{invoiceData.clientAddress}</p>
          )}
          {invoiceData.clientPhone && (
            <p className="text-sm text-muted-foreground">{invoiceData.clientPhone}</p>
          )}
          {invoiceData.clientEmail && (
            <p className="text-sm text-muted-foreground">{invoiceData.clientEmail}</p>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Line Items */}
      <div className="mb-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-invoice-border">
              <th className="text-left py-3 text-sm font-semibold text-muted-foreground">Description</th>
              <th className="text-center py-3 text-sm font-semibold text-muted-foreground">Type</th>
              <th className="text-right py-3 text-sm font-semibold text-muted-foreground">Qty</th>
              <th className="text-right py-3 text-sm font-semibold text-muted-foreground">Rate (৳)</th>
              <th className="text-right py-3 text-sm font-semibold text-muted-foreground">Amount (৳)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-invoice-border">
                <td className="py-3 text-sm text-foreground">{item.description || "—"}</td>
                <td className="py-3 text-center">
                  {item.isService ? (
                    <Badge variant="secondary" className="text-xs">Service</Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">Product</Badge>
                  )}
                </td>
                <td className="py-3 text-sm text-right text-foreground">{item.quantity}</td>
                <td className="py-3 text-sm text-right text-foreground">৳{item.sellingPrice.toFixed(2)}</td>
                <td className="py-3 text-sm text-right font-medium text-foreground">৳{item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium text-foreground">৳{subtotal.toFixed(2)}</span>
          </div>
          {invoiceData.discountPercent > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount ({invoiceData.discountPercent}%):</span>
              <span className="font-medium text-destructive">-৳{discount.toFixed(2)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span className="text-foreground">Total:</span>
            <span className="text-invoice-header">৳{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-muted">
            <span className="text-muted-foreground">Total Profit:</span>
            <span className="font-semibold text-accent">৳{totalProfit.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoiceData.notes && (
        <div className="mt-8 pt-6 border-t border-invoice-border">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Notes</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{invoiceData.notes}</p>
        </div>
      )}
    </Card>
  );
};

export default InvoicePreview;
