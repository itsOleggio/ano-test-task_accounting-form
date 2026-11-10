import type { Payment } from "../types/payment";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Pagination, TextField, Radio } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InputAdornment from "@mui/material/InputAdornment";
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
            <div className="filters">
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
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>№</TableCell>
                            <TableCell>Дата</TableCell>
                            <TableCell>Тип</TableCell>
                            <TableCell>Сумма</TableCell>
                            <TableCell>Заказчик</TableCell>
                            <TableCell>ИНН заказчика</TableCell>
                            <TableCell>Исполнитель</TableCell>
                            <TableCell>ИНН исполнителя</TableCell>
                            <TableCell>ФИО экзаменуемого</TableCell>
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
                                    <TableCell>
                                        {isMatched ? (
                                            <CheckCircleIcon color="success" titleAccess="Сопоставлен" />
                                        ) : (
                                            <Radio
                                                checked={selectedPaymentId === p.id}
                                                onChange={() => onSelectPayment(p.id)}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>{p.id}</TableCell>
                                    <TableCell>{p.createdAt}</TableCell>
                                    <TableCell>{p.type}</TableCell>
                                    <TableCell>{p.amount}</TableCell>
                                    <TableCell>{p.customer}</TableCell>
                                    <TableCell>{p.customerInn}</TableCell>
                                    <TableCell>{p.provider}</TableCell>
                                    <TableCell>{p.providerInn}</TableCell>
                                    <TableCell>{p.studentName}</TableCell>
                                    <TableCell>{p.paymentComment}</TableCell>
                                    <TableCell>{p.accountantComment}</TableCell>
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
