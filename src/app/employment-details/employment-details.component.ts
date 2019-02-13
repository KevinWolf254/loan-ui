import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { EmploymentDetails } from '../models/domains/employmentDetails.model';

@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.scss']
})
export class EmploymentDetailsComponent implements OnInit {

  public form: FormGroup;

  public canEdit: boolean = false;
  public isEditable: boolean = false;

  constructor(private _fb: FormBuilder, private _employeeService: EmployeeService) {
    this.form = _fb.group({
      'staffNo': ['', Validators.required],
      'designation': ['', Validators.required],
      'terms': ['', Validators.required],
      'other': ['']
    });
  }

  ngOnInit() {
    this._employeeService.employeeObserver.subscribe((employee: EmploymentDetails) => {
      if (employee.staffNo != undefined) {
        this.setFormValues(employee);
        this.canEdit = true;
      }
      else {
        this.form.reset();
        this.canEdit = false;
      }
    });
  }

  update(form: any) {

  }
  makeEditable() {
    this.isEditable = true;
  }
  public get isFormValid(): boolean {
    return this.form.valid;
  }
  public isControlInValid(formControlName: string, error: string): boolean {
    return this.form.controls[formControlName].hasError(error);
  }
  public isTouched(formControlName: string): boolean {
    return this.form.controls[formControlName].touched;
  }
  public get isStaffNoInvalid(): boolean {
    return (this.isTouched('staffNo') && (this.isControlInValid('staffNo', 'required')))
  }
  public get isDesignationInvalid(): boolean {
    return (this.isTouched('designation') && (this.isControlInValid('designation', 'required')))
  }
  setFormValues(employee: EmploymentDetails) {
    this.form.get('staffNo').setValue(employee.staffNo);
    this.form.get('designation').setValue(employee.designation);
    this.form.get('terms').setValue(employee.terms);
    if(employee.info != null)
      this.form.get('other').setValue(employee.info);
  }
}
