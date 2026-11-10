import type {Invoice} from "../types/invoice";
import React from "react";
import {
    Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Pagination, TextField, Checkbox, InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { usePaginatedSearch } from "../hooks/usePaginatedSearch";

const COLUMN_COUNT = 11;

interface Props {
    invoices: Invoice[];
    selectedInvoiceIds: number[];
    matchedInvoiceIds: number[];
    onToggleInvoice: (id: number) => void;
}

export const InvoiceTable: React.FC<Props> = ({ invoices, selectedInvoiceIds, matchedInvoiceIds, onToggleInvoice }) => {
    const { query, changeQuery, page, setPage, pageCount, pageItems } = usePaginatedSearch(
        invoices,
        (inv) => inv.studentName
    );

    return (
        <div>
            <div style={{ marginBottom: "10px" }}>
                <TextField
                    label="Поиск по ФИО"
                    size="small"
                    value={query}
                    onChange={(e) => changeQuery(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }
                    }}
                />
            </div>

            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
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
                        {pageItems.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={COLUMN_COUNT} align="center">
                                    Ничего не найдено
                                </TableCell>
                            </TableRow>
                        )}
                        {pageItems.map((inv) => {
                            const isMatched = matchedInvoiceIds.includes(inv.id);

                            return (
                                <TableRow
                                    key={inv.id}
                                    hover={!isMatched}
                                    selected={selectedInvoiceIds.includes(inv.id)}
                                    onClick={isMatched ? undefined : () => onToggleInvoice(inv.id)}
                                >
                                    <TableCell>
                                        {isMatched ? (
                                            <CheckCircleIcon color="success" titleAccess="Сопоставлен" />
                                        ) : (
                                            <Checkbox
                                                checked={selectedInvoiceIds.includes(inv.id)}
                                                onChange={() => onToggleInvoice(inv.id)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        )}
                                    </TableCell>
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
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <Pagination count={pageCount} page={page} onChange={(_, value) => setPage(value)} />
        </div>
    );
};
