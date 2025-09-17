import type {Invoice} from "../types/invoice";
import React from "react";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
    TextField,
} from "@mui/material";


interface Props {
    invoices: Invoice[];
}

export const InvoiceTable: React.FC<Props> = ({invoices}) => {
    return (
        <div>
            <div style={{marginBottom: "10px"}}>
                <TextField label="Поиск по ФИО" size="small"/>
            </div>

            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Тип</TableCell>
                        <TableCell>ФИО экзаменуемого</TableCell>
                        <TableCell>Квалификация</TableCell>
                        <TableCell>Сумма</TableCell>
                        <TableCell>Заказчик</TableCell>
                        <TableCell>ИНН заказчика</TableCell>
                        <TableCell>Исполнитель</TableCell>
                        <TableCell>ИНН исполнителя</TableCell>
                        <TableCell>Назначение платежа</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((inv) => (
                        <TableRow key={inv.id}>
                            <TableCell>{inv.id}</TableCell>
                            <TableCell>{inv.type}</TableCell>
                            <TableCell>{inv.studentName}</TableCell>
                            <TableCell>{inv.qualification}</TableCell>
                            <TableCell>{inv.amount}</TableCell>
                            <TableCell>{inv.customer}</TableCell>
                            <TableCell>{inv.customerInn}</TableCell>
                            <TableCell>{inv.provider}</TableCell>
                            <TableCell>{inv.providerInn}</TableCell>
                            <TableCell>{inv.purpose}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br></br>
            <Pagination count={5} page={1}/>
        </div>
    );
};