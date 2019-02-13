import { Loan } from "../domains/loan.model";
import { LoanAmount } from "../domains/loanAmount.model";

export class LoanResponse extends Loan{
    amount: LoanAmount;
}