import { Bank } from "../domains/bank.model";
import { BankBranch } from "../domains/bankBranch.model";

export class BranchResponse extends BankBranch{
    bank: Bank;
}