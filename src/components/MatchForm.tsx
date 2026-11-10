import React from "react";
import { Button, Alert, Stack, Typography } from "@mui/material";
import type { Payment } from "../types/payment";
import type { Invoice } from "../types/invoice";

interface Props {
    selectedPayment: Payment | null;
    selectedInvoices: Invoice[];
    onMatch: (payment: Payment, invoices: Invoice[]) => void;
}

export const MatchForm: React.FC<Props> = ({ selectedPayment, selectedInvoices, onMatch }) => {
    const [error, setError] = React.useState<string | null>(null);

    const invoicesTotal = selectedInvoices.reduce((sum, i) => sum + i.amount, 0);
    const isSelectionIncomplete = !selectedPayment || selectedInvoices.length === 0;

    const handleMatch = () => {
        if (!selectedPayment || selectedInvoices.length === 0) {
            return;
        }

        if (invoicesTotal !== selectedPayment.amount) {
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
        <Stack spacing={1.5}>
            <div>
                <Typography variant="body2">
                    Платёж: {selectedPayment ? `№${selectedPayment.id}, сумма ${selectedPayment.amount}` : "не выбран"}
                </Typography>
                <Typography variant="body2">
                    Счета: {selectedInvoices.length > 0 ? selectedInvoices.map((i) => `№${i.id}`).join(", ") : "не выбраны"}
                </Typography>
                {selectedInvoices.length > 0 && (
                    <Typography variant="body2">Сумма счетов: {invoicesTotal}</Typography>
                )}
            </div>
            {error && <Alert severity="error">{error}</Alert>}
            <Button
                variant="contained"
                color="primary"
                onClick={handleMatch}
                disabled={isSelectionIncomplete}
            >
                СОПОСТАВИТЬ
            </Button>
            {isSelectionIncomplete && (
                <Typography variant="caption" color="text.secondary">
                    Нужно выбрать один платёж и хотя бы один счёт
                </Typography>
            )}
        </Stack>
    );
};
