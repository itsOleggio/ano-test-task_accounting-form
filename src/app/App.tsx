import React from "react";
import { PaymentTable, InvoiceTable, MatchForm } from "../components/";
import { mockPayments, mockInvoices } from "../constants";
import type { Payment } from "../types/payment";
import type { Invoice } from "../types/invoice";
import styles from "../style/App.module.css";
import { Paper, Typography } from "@mui/material";

function App() {
    const [selectedPaymentId, setSelectedPaymentId] = React.useState<number | null>(null);
    const [selectedInvoiceIds, setSelectedInvoiceIds] = React.useState<number[]>([]);

    const selectedPayment = mockPayments.find((p) => p.id === selectedPaymentId) || null;
    const selectedInvoices = mockInvoices.filter((inv) => selectedInvoiceIds.includes(inv.id));

    const handleToggleInvoice = (id: number) => {
        setSelectedInvoiceIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleMatch = (payment: Payment, invoices: Invoice[]) => {
        console.log("Сопоставление выполнено:", { payment, invoices });
        alert(`Успешное сопоставление: платеж #${payment.id} со счетами ${invoices.map((i) => i.id).join(", ")}`);
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
                        selectedPayment={selectedPayment}
                        selectedInvoices={selectedInvoices}
                        onMatch={handleMatch}
                    />
                </Paper>
            </div>
        </div>
    );
}

export default App;
