import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceData } from "@/pages/Index";
import LineItemsTable from "./LineItemsTable";

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  setInvoiceData: (data: InvoiceData) => void;
}

const InvoiceForm = ({ invoiceData, setInvoiceData }: InvoiceFormProps) => {
  const updateField = (field: keyof InvoiceData, value: any) => {
    setInvoiceData({ ...invoiceData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => updateField("invoiceNumber", e.target.value)}
                placeholder="INV-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountPercent">Discount (%)</Label>
              <Input
                id="discountPercent"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={invoiceData.discountPercent}
                onChange={(e) => updateField("discountPercent", parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoiceData.invoiceDate}
                onChange={(e) => updateField("invoiceDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoiceData.dueDate}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="previousProduct">Previous Product/Invoice Reference</Label>
            <Input
              id="previousProduct"
              value={invoiceData.previousProduct}
              onChange={(e) => updateField("previousProduct", e.target.value)}
              placeholder="Reference to previous product or invoice"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={invoiceData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="BOT Engineers"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Address</Label>
            <Textarea
              id="companyAddress"
              value={invoiceData.companyAddress}
              onChange={(e) => updateField("companyAddress", e.target.value)}
              placeholder="1/10, North South Road, A Block, Banasree"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyPhone">Phone</Label>
              <Input
                id="companyPhone"
                value={invoiceData.companyPhone}
                onChange={(e) => updateField("companyPhone", e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={invoiceData.companyEmail}
                onChange={(e) => updateField("companyEmail", e.target.value)}
                placeholder="info@botengineers.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={invoiceData.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              placeholder="Client Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Address</Label>
            <Textarea
              id="clientAddress"
              value={invoiceData.clientAddress}
              onChange={(e) => updateField("clientAddress", e.target.value)}
              placeholder="Client address"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientPhone">Phone</Label>
              <Input
                id="clientPhone"
                value={invoiceData.clientPhone}
                onChange={(e) => updateField("clientPhone", e.target.value)}
                placeholder="Client phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email</Label>
              <Input
                id="clientEmail"
                type="email"
                value={invoiceData.clientEmail}
                onChange={(e) => updateField("clientEmail", e.target.value)}
                placeholder="client@email.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Products & Services</CardTitle>
        </CardHeader>
        <CardContent>
          <LineItemsTable invoiceData={invoiceData} setInvoiceData={setInvoiceData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={invoiceData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Add any additional notes or payment terms..."
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceForm;
