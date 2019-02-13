import { Bank } from "../domains/bank.model";
import { LoanOther } from "../domains/loanOther.model";
import { LoanOtherAmount } from "../domains/loanOtherAmount.model";

export class LoanOtherResponse extends LoanOther{
    bank: Bank;
    amount: LoanOtherAmount;
}