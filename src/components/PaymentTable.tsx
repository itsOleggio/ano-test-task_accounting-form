import type { Payment } from "../types/payment";
import { Box, Chip, Stack, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Pagination, TextField, Radio, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InputAdornment from "@mui/material/InputAdornment";
import { TABLE_SELECT_COLUMN_WIDTH } from "../constants";
import { usePaginatedSearch } from "../hooks/usePaginatedSearch";

const COLUMN_COUNT = 12;

interface Props {
  payments: Payment[];
  selectedPaymentId: number | null;
  matchedPaymentIds: number[];
  onSelectPayment: (id: number) => void;
}

export const PaymentTable: React.FC<Props> = ({ payments, selectedPaymentId, matchedPaymentIds, onSelectPayment }) => {
  const { query, changeQuery, page, setPage, pageCount, pageItems } = usePaginatedSearch(
    payments,
    (p) => p.customer
  );

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", marginBottom: 1.5 }}>
        <Typography variant="h6" component="h2">
          Платежи
        </Typography>
        <TextField
          label="Поиск по заказчику"
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
              <TableCell>Дата</TableCell>
              <TableCell>Комментарий платежа</TableCell>
              <TableCell>Комментарий бухгалтера</TableCell>
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
            {pageItems.map((p) => {
              const isMatched = matchedPaymentIds.includes(p.id);

              return (
                <TableRow
                  key={p.id}
                  hover={!isMatched}
                  selected={selectedPaymentId === p.id}
                  onClick={isMatched ? undefined : () => onSelectPayment(p.id)}
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
                      <Radio
                        size="small"
                        checked={selectedPaymentId === p.id}
                        onChange={() => onSelectPayment(p.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell align="right">{p.amount}</TableCell>
                  <TableCell>{p.customer}</TableCell>
                  <TableCell>{p.customerInn}</TableCell>
                  <TableCell>{p.studentName}</TableCell>
                  <TableCell>{p.provider}</TableCell>
                  <TableCell>{p.providerInn}</TableCell>
                  <TableCell>{p.createdAt}</TableCell>
                  <TableCell>{p.paymentComment}</TableCell>
                  <TableCell>{p.accountantComment}</TableCell>
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
