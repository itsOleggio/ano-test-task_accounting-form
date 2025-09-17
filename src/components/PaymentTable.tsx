import type { Payment } from "../types/payment";
import { Table, TableHead, TableRow, TableCell, TableBody, Pagination, TextField, Radio } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";

interface Props {
    payments: Payment[];
    selectedPaymentId: number | null;
    onSelectPayment: (id: number) => void;
}

export const PaymentTable: React.FC<Props> = ({ payments, selectedPaymentId, onSelectPayment }) => {
    return (
        <div>
            <div className="filters">
                <TextField
                    label="Поиск по заказчику"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </div>

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
                    {payments.map((p) => (
                        <TableRow
                            key={p.id}
                            hover
                            selected={selectedPaymentId === p.id}
                            onClick={() => onSelectPayment(p.id)}
                        >
                            <TableCell>
                                <Radio
                                    checked={selectedPaymentId === p.id}
                                    onChange={() => onSelectPayment(p.id)}
                                />
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
                    ))}
                </TableBody>
            </Table>
            <br />
            <Pagination count={10} page={1} />
        </div>
    );
};
