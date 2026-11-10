import type { Invoice } from "../types/invoice";
import React from "react";
import {
  Box, Chip, Stack, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Pagination, TextField, Checkbox, InputAdornment, Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TABLE_SELECT_COLUMN_WIDTH } from "../constants";
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
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", marginBottom: 1.5 }}>
        <Typography variant="h6" component="h2">
          Счета
        </Typography>
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
      </Stack>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Box sx={{ width: TABLE_SELECT_COLUMN_WIDTH }} />
              </TableCell>
              <TableCell>№</TableCell>
              <TableCell>Тип</TableCell>
              <TableCell align="right">Сумма</TableCell>
              <TableCell>Заказчик</TableCell>
              <TableCell>ИНН заказчика</TableCell>
              <TableCell>ФИО экзаменуемого</TableCell>
              <TableCell>Исполнитель</TableCell>
              <TableCell>ИНН исполнителя</TableCell>
              <TableCell>Квалификация</TableCell>
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
                  <TableCell padding="checkbox">
                    {isMatched ? (
                      <Chip
                        size="small"
                        color="success"
                        variant="outlined"
                        icon={<CheckCircleIcon />}
                        label="Сопоставлен"
                      />
                    ) : (
                      <Checkbox
                        size="small"
                        checked={selectedInvoiceIds.includes(inv.id)}
                        onChange={() => onToggleInvoice(inv.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </TableCell>
                  <TableCell>{inv.id}</TableCell>
                  <TableCell>{inv.type}</TableCell>
                  <TableCell align="right">{inv.amount}</TableCell>
                  <TableCell>{inv.customer}</TableCell>
                  <TableCell>{inv.customerInn}</TableCell>
                  <TableCell>{inv.studentName}</TableCell>
                  <TableCell>{inv.provider}</TableCell>
                  <TableCell>{inv.providerInn}</TableCell>
                  <TableCell>{inv.qualification}</TableCell>
                  <TableCell>{inv.purpose}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination size="small" count={pageCount} page={page} onChange={(_, value) => setPage(value)} sx={{ marginTop: 1.5 }} />
    </div>
  );
};
