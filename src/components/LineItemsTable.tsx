import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Minus, Trash2 } from "lucide-react";
import { InvoiceData, LineItem } from "@/pages/Index";
import { useEffect } from "react";

interface LineItemsTableProps {
  invoiceData: InvoiceData;
  setInvoiceData: (data: InvoiceData) => void;
}

const LineItemsTable = ({ invoiceData, setInvoiceData }: LineItemsTableProps) => {
  // Calculate invoice totals whenever line items change
  useEffect(() => {
    const subtotal = invoiceData.lineItems.reduce((sum, item) => sum + item.amount, );
    const totalProfit = invoiceData.lineItems.reduce((sum, item) => sum + item.profit, 0);
    const total = subtotal;

    setInvoiceData({
      ...invoiceData,
      subtotal,
      totalProfit,
      total,
    });
  }, [invoiceData.lineItems]); // Re-run when line items change

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      description: "",
      isService: false,
      quantity: 1,
      buyingPrice: 0,
      sellingPrice: 0,
      amount: 0,
      profit: 0,
    };
    setInvoiceData({
      ...invoiceData,
      lineItems: [...invoiceData.lineItems, newItem],
    });
  };

  const removeLineItem = (id: string) => {
    if (invoiceData.lineItems.length > 1) {
      setInvoiceData({
        ...invoiceData,
        lineItems: invoiceData.lineItems.filter((item) => item.id !== id),
      });
    }
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number | boolean) => {
    const updatedItems = invoiceData.lineItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate amount and profit when relevant fields change
        if (field === "quantity" || field === "sellingPrice" || field === "buyingPrice") {
          updatedItem.amount = updatedItem.quantity * updatedItem.sellingPrice;
          updatedItem.profit = (updatedItem.sellingPrice - updatedItem.buyingPrice) * updatedItem.quantity;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setInvoiceData({ ...invoiceData, lineItems: updatedItems });
  };

  const incrementQuantity = (id: string) => {
    const item = invoiceData.lineItems.find(item => item.id === id);
    if (item) {
      updateLineItem(id, "quantity", item.quantity + 1);
    }
  };

  const decrementQuantity = (id: string) => {
    const item = invoiceData.lineItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateLineItem(id, "quantity", item.quantity - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-sm font-semibold text-muted-foreground">Description</th>
              <th className="text-center py-2 px-2 text-sm font-semibold text-muted-foreground w-20">Service</th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-muted-foreground w-32">Qty</th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-muted-foreground w-28">Buying (৳)</th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-muted-foreground w-28">Selling (৳)</th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-muted-foreground w-28">Profit (৳)</th>
              <th className="text-right py-2 px-2 text-sm font-semibold text-muted-foreground w-28">Amount (৳)</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.lineItems.map((item) => (
              <tr key={item.id} className="border-b border-border">
                <td className="py-2 px-2">
                  <Input
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                    placeholder="Item description"
                    className="h-9"
                  />
                </td>
                <td className="py-2 px-2">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={item.isService}
                      onCheckedChange={(checked) => updateLineItem(item.id, "isService", checked as boolean)}
                    />
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      className="h-7 w-7"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, "quantity", parseFloat(e.target.value) || 1)}
                      className="text-right h-9 w-16"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => incrementQuantity(item.id)}
                      className="h-7 w-7"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
                <td className="py-2 px-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.buyingPrice}
                    onChange={(e) => updateLineItem(item.id, "buyingPrice", parseFloat(e.target.value) || 0)}
                    className="text-right h-9"
                  />
                </td>
                <td className="py-2 px-2">
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.sellingPrice}
                    onChange={(e) => updateLineItem(item.id, "sellingPrice", parseFloat(e.target.value) || 0)}
                    className="text-right h-9"
                  />
                </td>
                <td className="py-2 px-2 text-right font-medium text-sm">
                  ৳{item.profit.toFixed(2)}
                </td>
                <td className="py-2 px-2 text-right font-medium text-sm">
                  ৳{item.amount.toFixed(2)}
                </td>
                <td className="py-2 px-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLineItem(item.id)}
                    disabled={invoiceData.lineItems.length === 1}
                    className="h-9 w-9"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button onClick={addLineItem} variant="outline" className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Add Product/Service
      </Button>
    </div>
  );
};

export default LineItemsTable;