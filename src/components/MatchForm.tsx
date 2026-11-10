import React from "react";
import { useForm } from "react-hook-form";
import { Button, Alert, Stack, Typography } from "@mui/material";
import type { Payment } from "../types/payment";
import type { Invoice } from "../types/invoice";

interface Props {
    selectedPayment: Payment | null;
    selectedInvoices: Invoice[];
    onMatch: (payment: Payment, invoices: Invoice[]) => void;
}

export const MatchForm: React.FC<Props> = ({ selectedPayment, selectedInvoices, onMatch }) => {
    const { handleSubmit, setError, formState: { errors } } = useForm();

    const invoicesTotal = selectedInvoices.reduce((sum, i) => sum + i.amount, 0);
    const isSelectionIncomplete = !selectedPayment || selectedInvoices.length === 0;

    const onSubmit = () => {
        if (!selectedPayment || selectedInvoices.length === 0) {
            return;
        }

        if (invoicesTotal !== selectedPayment.amount) {
            setError("root", { message: "Сумма счетов не совпадает с суммой платежа" });
            return;
        }

        if (!selectedInvoices.every(i => i.customerInn === selectedPayment.customerInn)) {
            setError("root", { message: "ИНН заказчика не совпадает" });
            return;
        }

        onMatch(selectedPayment, selectedInvoices);
    };

    return (
        <Stack component="form" spacing={1.5} noValidate onSubmit={handleSubmit(onSubmit)}>
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
            {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
            <Button
                type="submit"
                variant="contained"
                color="primary"
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
