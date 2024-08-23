import { createContext, Dispatch, SetStateAction } from "react";


export interface IExpensesInfo {
    id: string;
    author: string;
    title: string;
    price: number;
    state: string;
    create_at: string;
}


const ExpensesInfoContext = createContext<{
    expensesInfo: IExpensesInfo[],
    setExpensesInfo: Dispatch<SetStateAction<IExpensesInfo[]>>
} | undefined>(undefined)


export default ExpensesInfoContext