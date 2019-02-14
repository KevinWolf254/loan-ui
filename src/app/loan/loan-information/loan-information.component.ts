import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AccountResponse } from 'src/app/models/responses/accountResponse.model';
import { BranchResponse } from 'src/app/models/responses/branchResponse.model';
import { Bank } from 'src/app/models/domains/bank.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { LoanResponse } from 'src/app/models/responses/loanResponse.model';

@Component({
  selector: 'app-loan-information',
  templateUrl: './loan-information.component.html',
  styleUrls: ['./loan-information.component.scss']
})
export class LoanInformationComponent implements OnInit {
  public form: FormGroup;
  public formBranch: FormGroup;
  public formAccount: FormGroup;

  public formLoan: FormGroup;
  public formOtherLoan: FormGroup;

  public loanApps: LoanResponse[] = [];
  
  constructor(private _fb: FormBuilder, private _accountService: AccountService, private _loanService: LoanService) {
    this.formAccount = _fb.group({
      'accountCode': [''],
      'accountName': [''],
    });
    this.formBranch = _fb.group({
      'branchCode': [''],
      'branchName': [''],
      'account': this.formAccount
    });
    this.form = _fb.group({
      'bankCode': [''],
      'bankName': [''],
      'branch': this.formBranch
    });
    //loan application form
    this.formLoan = _fb.group({
      'type': ['', Validators.required],
      'currency': ['', Validators.required],
      'amount': ['', Validators.required],     
      'purpose': ['', Validators.required],     
      'status': ['PENDING', Validators.required],     
    });
    //other loans form
    this.formOtherLoan = _fb.group({
      'type': ['', Validators.required],
      'currency': ['', Validators.required],
      'amount': ['', Validators.required],     
      'purpose': ['', Validators.required],     
      'status': ['PENDING', Validators.required],     
    });
  }

  ngOnInit() {
    this._accountService.accountObserver.subscribe((account: AccountResponse) => {
      if (account.name != null || account.branch != undefined)
        this.setAccountFormValues(account);
    })
    this._loanService.loanObserver.subscribe((loanApps: LoanResponse[]) => {
      this.loanApps = loanApps;
    })
  }
  setAccountFormValues(account: AccountResponse) {
    this.form.get('bankCode').setValue(account.branch.bank.code);
    this.form.get('bankName').setValue(account.branch.bank.name);
    this.form.get('branch').get('branchCode').setValue(account.branch.code);
    this.form.get('branch').get('branchName').setValue(account.branch.name);
    this.form.get('branch').get('account').get('accountCode').setValue(account.number);
    this.form.get('branch').get('account').get('accountName').setValue(account.name);

  }
  addLoan(form: any){

  }
  addOtherLoan(form: any){

  }
  public get isFormValid() {
    return this.formLoan.valid;
  }
  public isControlInValid(formControlName: string, error: string): boolean {
    return this.formLoan.controls[formControlName].hasError(error);
  }
  public isTouched(formControlName: string): boolean {
    return this.formLoan.controls[formControlName].touched;
  }
  get isTypeInvalid(){
    return (this.isTouched('type') && (this.isControlInValid('type', 'required')))
  }
  get isCurrencyInvalid(){
    return (this.isTouched('currency') && (this.isControlInValid('currency', 'required')))
  }
  get isAmountInvalid(){
    return (this.isTouched('amount') && (this.isControlInValid('amount', 'required')))
  }
  get isPurposeInvalid(){
    return (this.isTouched('purpose') && (this.isControlInValid('purpose', 'required')))
  }
}
