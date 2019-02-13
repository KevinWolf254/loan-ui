import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InstitutionService } from '../services/institution.service';
import { InstitutionResponse } from '../models/responses/institutionResponse.model';

@Component({
  selector: 'app-institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.scss']
})
export class InstitutionComponent implements OnInit {

  public form: FormGroup;
  public formContacts: FormGroup;
  public formResidence: FormGroup;

  public canEdit: boolean = false;
  public isEditable: boolean = false;


  constructor(private _fb: FormBuilder, private _instituteService: InstitutionService) {
    this.formResidence = _fb.group({
      'owned': [''],
      'duration': [''],
      'estate': [''],
      'street': [''],
      'officeNo': [''],
    });
    this.formContacts = _fb.group({
      'officeNo': ['', Validators.required],
      'number': [''],
      'code': [''],
      'residence': this.formResidence
    });
    this.form = _fb.group({
      'name': ['', Validators.required],
      'industry': ['', Validators.required],
      'operation': ['', Validators.required],
      'contacts': this.formContacts
    });
  }

  ngOnInit() {
    this._instituteService.institutionObserver.subscribe(institute => {
      console.log('Institute: ' + institute)
      if (institute.name != null || institute.name != undefined){
        this.setFormValues(institute);
        this.canEdit = true;
      }
      else{
        this.form.reset();
        this.canEdit = false;
      }
    })
  }
  update(form: any) {

  }
  public makeEditable() {
    this.isEditable = true;
  }
  public get isFormValid() {
    return this.form.valid;
  }
  public isControlInValid(formControlName: string, error: string): boolean {
    return this.form.controls[formControlName].hasError(error);
  }
  public isNestedControlInValid(groupName: string, formControlName: string, error: string): boolean {
    if (groupName == 'contacts')
      return this.formContacts.controls[formControlName].hasError(error);
    else
      return this.formResidence.controls[formControlName].hasError(error);
  }
  public isTouched(formControlName: string): boolean {
    return this.form.controls[formControlName].touched;
  }
  public isNestedTouched(groupName: string, formControlName: string): boolean {
    if (groupName == 'contacts')
      return this.formContacts.controls[formControlName].touched;
    else
      return this.formResidence.controls[formControlName].touched;

  }
  public get isNameInvalid(){
    return (this.isTouched('name') && (this.isControlInValid('name', 'required')))
  }
  public get isIndustryInvalid(){
    return (this.isTouched('industry') && (this.isControlInValid('industry', 'required')))
  }
  public get isOperationInvalid(){
    return (this.isTouched('operation') && (this.isControlInValid('operation', 'required')))
  }
  public get isOfficePhoneNoInvalid(){
    return (this.isNestedTouched('contacts', 'officeNo') && (this.isNestedControlInValid('contacts', 'officeNo', 'required')))
  }
  public setFormValues(institute: InstitutionResponse) {

    this.form.get('name').setValue(institute.name)
    this.form.get('industry').setValue(institute.industry)
    this.form.get('operation').setValue(institute.yearsOperational)
    this.form.get('contacts').get('officeNo').setValue(institute.phoneNo)
    this.form.get('contacts').get('number').setValue(institute.postalAddress.number)
    this.form.get('contacts').get('code').setValue(institute.postalAddress.code)
    this.form.get('contacts').get('residence').get('owned').setValue(institute.residence.owned)
    this.form.get('contacts').get('residence').get('duration').setValue(institute.residence.occupancyDuration)

    let address: string = institute.residence.physicalAddress;
    let array: string[] = address.split(',')

    this.form.get('contacts').get('residence').get('estate').setValue(array[0])
    this.form.get('contacts').get('residence').get('street').setValue(array[1])
    this.form.get('contacts').get('residence').get('officeNo').setValue(array[2])
  }
}
