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
  const amountDifference = selectedPayment ? selectedPayment.amount - invoicesTotal : 0;

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
    <Stack
      component="form"
      direction="row"
      spacing={2}
      useFlexGap
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flex: 1, minWidth: 0, flexWrap: "wrap", alignItems: "center" }}
    >
      <Stack direction="row" spacing={3} useFlexGap sx={{ flexGrow: 1, flexWrap: "wrap" }}>
        <Typography>
          Платёж: {selectedPayment ? `№${selectedPayment.id}, сумма ${selectedPayment.amount}` : "не выбран"}
        </Typography>
        <Typography>
          Счета: {selectedInvoices.length > 0 ? selectedInvoices.map((i) => `№${i.id}`).join(", ") : "не выбраны"}
        </Typography>
        {selectedInvoices.length > 0 && (
          <Typography>Сумма счетов: {invoicesTotal}</Typography>
        )}
        {!isSelectionIncomplete && (
          <Typography color={amountDifference === 0 ? "success.dark" : "error.dark"} sx={{ fontWeight: 500 }}>
            {amountDifference === 0 ? "Суммы совпадают" : `Разница: ${amountDifference}`}
          </Typography>
        )}
      </Stack>
      {errors.root && (
        <Alert severity="error" sx={{ paddingY: 0 }}>
          {errors.root.message}
        </Alert>
      )}
      {isSelectionIncomplete && (
        <Typography variant="body2" color="text.secondary">
          Нужно выбрать один платёж и хотя бы один счёт
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSelectionIncomplete}
        sx={{ flexShrink: 0 }}
      >
        СОПОСТАВИТЬ
      </Button>
    </Stack>
  );
};
