import React from "react";
import { Button, Alert } from "@mui/material";
import type { Payment } from "../types/payment";
import type { Invoice } from "../types/invoice";

interface Props {
    selectedPayment: Payment | null;
    selectedInvoices: Invoice[];
    onMatch: (payment: Payment, invoices: Invoice[]) => void;
}

export const MatchForm: React.FC<Props> = ({ selectedPayment, selectedInvoices, onMatch }) => {
    const [error, setError] = React.useState<string | null>(null);

    const handleMatch = () => {
        if (!selectedPayment || selectedInvoices.length === 0) {
            setError("Нужно выбрать хотя бы один платёж и один счёт");
            return;
        }

        const total = selectedInvoices.reduce((sum, i) => sum + i.amount, 0);
        if (total !== selectedPayment.amount) {
            setError("Сумма счетов не совпадает с суммой платежа");
            return;
        }

        if (!selectedInvoices.every(i => i.customerInn === selectedPayment.customerInn)) {
            setError("ИНН заказчика не совпадает");
            return;
        }

        setError(null);
        onMatch(selectedPayment, selectedInvoices);
    };

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <Button
                variant="contained"
                color="primary"
                onClick={handleMatch}
                disabled={!selectedPayment || selectedInvoices.length === 0}
            >
                СОПОСТАВИТЬ
            </Button>
        </div>
    );
};
