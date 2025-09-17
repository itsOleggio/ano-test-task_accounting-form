export interface Invoice {
    id: number;
    type: "обучение" | "пошлина";
    studentName: string;
    qualification: string;
    amount: number;
    customer: string;
    customerInn: string;
    provider: string;
    providerInn: string;
    purpose: string;
}