export interface Payment {
    id: number;
    createdAt: string;
    type: "электронный" | "наличный";
    amount: number;
    customer: string;
    customerInn: string;
    provider: string;
    providerInn: string;
    studentName: string;
    paymentComment: string;
    accountantComment: string;
}
