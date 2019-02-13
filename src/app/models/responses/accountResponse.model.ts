import { MemberAccount } from "../domains/account.model";
import { BranchResponse } from "./branchResponse.model";

export class AccountResponse extends MemberAccount{
    branch: BranchResponse;
}