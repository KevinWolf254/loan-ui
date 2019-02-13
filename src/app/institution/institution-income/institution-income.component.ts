import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { InstitutionService } from 'src/app/services/institution.service';
import { InstitutionIncomeResponse } from 'src/app/models/responses/institutionIncomeResponse.model';

@Component({
  selector: 'app-institution-income',
  templateUrl: './institution-income.component.html',
  styleUrls: ['./institution-income.component.scss']
})
export class InstitutionIncomeComponent implements OnInit {

  public form: FormGroup;
  public incomes: InstitutionIncomeResponse[] = [];

  constructor(private _fb: FormBuilder, private _instituteService: InstitutionService) { 
    this.form = _fb.group({
      'type': ['', Validators.required],
      'details': [''],
      'currency': ['', Validators.required],
      'amount': ['', Validators.required], 
    });
  }
  ngOnInit() {
    this._instituteService.institutionIncomeObserver.subscribe((incomes: InstitutionIncomeResponse[]) => {
        this.incomes = incomes;
    });
  }
  add(form: any){

  }
  public get isFormValid() {
    return this.form.valid;
  }
  public isControlInValid(formControlName: string, error: string): boolean {
    return this.form.controls[formControlName].hasError(error);
  }
  public isTouched(formControlName: string): boolean {
    return this.form.controls[formControlName].touched;
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
}
