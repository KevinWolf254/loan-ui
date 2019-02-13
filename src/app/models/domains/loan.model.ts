import {  LoanStatus } from "../../enums/loanStatus.model";
import { LoanType } from "../../enums/loanType.model";

export class Loan{
    id: number;
    type: LoanType;
    purpose: string;
    status: LoanStatus;
}