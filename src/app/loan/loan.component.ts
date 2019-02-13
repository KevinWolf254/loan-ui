import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberService } from '../services/member.service';
import { EmployeeService } from '../services/employee.service';
import { InstitutionService } from '../services/institution.service';
import { AccountService } from '../services/account.service';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  public form: FormGroup;

  constructor(private _fb: FormBuilder, private _memberService: MemberService, private _employeeService: EmployeeService,
    private _instituteService: InstitutionService, private _accountService: AccountService, private _loanAppService: LoanService) {
    this.form = _fb.group({
      'memberNo': ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  ngOnInit() {
  }

  public isSearchInValid(formControlName: string, error: string): boolean {
    return this.form.controls[formControlName].hasError(error);
  }
  public isTouched(formControlName: string): boolean {
    return this.form.controls[formControlName].touched;
  }
  public get isInvalid() {
    return (this.isTouched('memberNo') && (this.isSearchInValid('memberNo', 'required') || this.isSearchInValid('memberNo', 'minlength')));
  }
  public get isFormInvalid(): boolean {
    return this.form.invalid
  }

  public search(form: any) {
    let memberNo = form.memberNo
    this._memberService.getMemberDetails(memberNo).subscribe(member => this._memberService.member = member);
    this._employeeService.getEmployeeDetails(memberNo).subscribe(employee => this._employeeService.employee = employee);
    this._instituteService.getInstitutionDetails(memberNo).subscribe(institute => this._instituteService.institution = institute);
    this._instituteService.getInstitutionIncomes(memberNo).subscribe(incomes => this._instituteService.incomes = incomes);
    this._accountService.getAccount(memberNo).subscribe(account => this._accountService.account = account)
    this._loanAppService.getLoanApplications(memberNo).subscribe(loanApps => this._loanAppService.loanApplications = loanApps)
  }
}
