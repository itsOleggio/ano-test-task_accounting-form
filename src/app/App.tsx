import { PaymentTable, InvoiceTable, MatchForm  } from "../components/";
import type { Payment } from "../types/payment";
import type { Invoice } from "../types/invoice";
import styles from "../style/App.module.css";


const mockPayments: Payment[] = [
    {
        id: 1,
        createdAt: "2025-09-17",
        type: "электронный",
        amount: 12000,
        customer: "ООО Ромашка",
        customerInn: "1234567890",
        provider: "ИП Иванов",
        providerInn: "9876543210",
        studentName: "Петров Петр",
        paymentComment: "Оплата за экзамен",
        accountantComment: "",
    },
];

const mockInvoices: Invoice[] = [
    {
        id: 101,
        type: "обучение",
        studentName: "Петров Петр",
        qualification: "A123456789",
        amount: 12000,
        customer: "ООО Ромашка",
        customerInn: "1234567890",
        provider: "ИП Иванов",
        providerInn: "9876543210",
        purpose: "Обучение по курсу",
    },
];

function App() {
    return (
        <div className={styles.container}>
            <div className={styles.tables_block}>
                <div>
                    <h2>Платежи</h2>
                    <PaymentTable payments={mockPayments}/>
                </div>
                <div>
                    <h2>Счета</h2>
                    <InvoiceTable invoices={mockInvoices}/>
                </div>
            </div>

            <div className={styles.match_block}>
                <div>
                    <h2>Сопоставление</h2>
                    <MatchForm/>
                </div>
            </div>
        </div>
    );
}

export default App;
