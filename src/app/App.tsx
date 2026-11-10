import { useRef, useState } from "react";
import { PaymentTable, InvoiceTable, MatchForm, MatchConsole } from "../components/";
import { mockPayments, mockInvoices, MATCH_LOG_LABEL } from "../constants";
import type { Payment } from "../types/payment";
import type { Invoice } from "../types/invoice";
import type { MatchLogEntry } from "../types/matchLogEntry";
import styles from "../style/App.module.css";
import { Alert, Paper, Snackbar, Typography } from "@mui/material";

function App() {
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<number[]>([]);
  const [matchedPaymentIds, setMatchedPaymentIds] = useState<number[]>([]);
  const [matchedInvoiceIds, setMatchedInvoiceIds] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [matchLog, setMatchLog] = useState<MatchLogEntry[]>([]);
  const nextLogEntryId = useRef(0);

  const selectedPayment = mockPayments.find((p) => p.id === selectedPaymentId) || null;
  const selectedInvoices = mockInvoices.filter((inv) => selectedInvoiceIds.includes(inv.id));

  const handleToggleInvoice = (id: number) => {
    setSelectedInvoiceIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleMatch = (payment: Payment, invoices: Invoice[]) => {
    const invoiceIds = invoices.map((i) => i.id);

    const logEntries = invoiceIds.map((invoiceId) => ({
      id: nextLogEntryId.current++,
      invoiceId: String(invoiceId),
      paymentId: String(payment.id),
    }));

    logEntries.forEach(({ invoiceId, paymentId }) => {
      console.log(MATCH_LOG_LABEL, { invoiceId, paymentId });
    });

    setMatchLog((prev) => [...prev, ...logEntries]);
    setMatchedPaymentIds((prev) => [...prev, payment.id]);
    setMatchedInvoiceIds((prev) => [...prev, ...invoiceIds]);
    setSelectedPaymentId(null);
    setSelectedInvoiceIds([]);
    setSuccessMessage(`Успешное сопоставление: платеж #${payment.id} со счетами ${invoiceIds.join(", ")}`);
  };

  return (
    <div className={styles.container}>
      <Paper elevation={1} sx={{ padding: 2 }}>
        <PaymentTable
          payments={mockPayments}
          selectedPaymentId={selectedPaymentId}
          matchedPaymentIds={matchedPaymentIds}
          onSelectPayment={setSelectedPaymentId}
        />
      </Paper>

      <Paper elevation={1} sx={{ padding: 2 }}>
        <InvoiceTable
          invoices={mockInvoices}
          selectedInvoiceIds={selectedInvoiceIds}
          matchedInvoiceIds={matchedInvoiceIds}
          onToggleInvoice={handleToggleInvoice}
        />
      </Paper>

      <Paper elevation={4} className={styles.match_bar} sx={{ padding: 2 }}>
        <Typography variant="h6" component="h2">
          Сопоставление
        </Typography>
        <MatchForm
          key={`${selectedPaymentId}:${selectedInvoiceIds.join(",")}`}
          selectedPayment={selectedPayment}
          selectedInvoices={selectedInvoices}
          onMatch={handleMatch}
        />
        <MatchConsole entries={matchLog} onClear={() => setMatchLog([])} />
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={successMessage !== null}
        autoHideDuration={4000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
    </div>
  );
}

export default App;
