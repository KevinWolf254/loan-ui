import { InstitutionIncome } from '../domains/institutionIncome.model'
import { InstitutionIncomeAmount } from '../domains/institutionIncomeAmount.model'

export class InstitutionIncomeResponse extends InstitutionIncome{
    incomeAmount: InstitutionIncomeAmount;

}