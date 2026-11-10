import React from "react";
import { PaymentTable, InvoiceTable, MatchForm } from "../components/";
import { mockPayments, mockInvoices } from "../constants";
import type { Payment } from "../types/payment";
import type { Invoice } from "../types/invoice";
import styles from "../style/App.module.css";
import { Alert, Paper, Snackbar, Typography } from "@mui/material";

function App() {
    const [selectedPaymentId, setSelectedPaymentId] = React.useState<number | null>(null);
    const [selectedInvoiceIds, setSelectedInvoiceIds] = React.useState<number[]>([]);
    const [matchedPaymentIds, setMatchedPaymentIds] = React.useState<number[]>([]);
    const [matchedInvoiceIds, setMatchedInvoiceIds] = React.useState<number[]>([]);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

    const selectedPayment = mockPayments.find((p) => p.id === selectedPaymentId) || null;
    const selectedInvoices = mockInvoices.filter((inv) => selectedInvoiceIds.includes(inv.id));

    const handleToggleInvoice = (id: number) => {
        setSelectedInvoiceIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleMatch = (payment: Payment, invoices: Invoice[]) => {
        const invoiceIds = invoices.map((i) => i.id);

        invoiceIds.forEach((invoiceId) => {
            console.log("Сопоставление:", { invoiceId: String(invoiceId), paymentId: String(payment.id) });
        });

        setMatchedPaymentIds((prev) => [...prev, payment.id]);
        setMatchedInvoiceIds((prev) => [...prev, ...invoiceIds]);
        setSelectedPaymentId(null);
        setSelectedInvoiceIds([]);
        setSuccessMessage(`Успешное сопоставление: платеж #${payment.id} со счетами ${invoiceIds.join(", ")}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.tables_block}>
                <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Платежи
                    </Typography>
                    <PaymentTable
                        payments={mockPayments}
                        selectedPaymentId={selectedPaymentId}
                        matchedPaymentIds={matchedPaymentIds}
                        onSelectPayment={setSelectedPaymentId}
                    />
                </Paper>

                <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Счета
                    </Typography>
                    <InvoiceTable
                        invoices={mockInvoices}
                        selectedInvoiceIds={selectedInvoiceIds}
                        matchedInvoiceIds={matchedInvoiceIds}
                        onToggleInvoice={handleToggleInvoice}
                    />
                </Paper>
            </div>

            <div className={styles.match_block}>
                <Paper elevation={4} sx={{ padding: 2, margin: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Сопоставление
                    </Typography>
                    <MatchForm
                        key={`${selectedPaymentId}:${selectedInvoiceIds.join(",")}`}
                        selectedPayment={selectedPayment}
                        selectedInvoices={selectedInvoices}
                        onMatch={handleMatch}
                    />
                </Paper>
            </div>

            <Snackbar
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
