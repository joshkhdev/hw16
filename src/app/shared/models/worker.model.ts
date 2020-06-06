export interface MyWorker {
    name: string,
    surname: string,
    patronymic: string,
    phone: string,
    email: string,
    date: string,
    role: number,
    id?: number
}
export enum MyWorkerRole {
    IT, Sales, Delivery, Legal
}