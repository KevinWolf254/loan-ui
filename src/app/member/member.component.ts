import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { MemberResponse } from '../models/responses/memberResponse.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostalAddress } from '../models/domains/postalAddress.model';
import { MemberResidence } from '../models/domains/memberResidence.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  public form: FormGroup;
  public formContacts: FormGroup;
  public formResidence: FormGroup;

  public canEdit: boolean = false;
  public isEditable: boolean = false;

  constructor(private _fb: FormBuilder, private _memberService: MemberService) {
    this.formResidence = _fb.group({
      'estate': [''],
      'street': [''],
      'houseNo': [''],
      'owned': [''],
      'duration': [''],
    });

    this.formContacts = _fb.group({
      'mobileNo': ['', Validators.required],
      'email': ['', Validators.email],
      'number': [''],
      'code': [''],
      'residence': this.formResidence
    });

    this.form = _fb.group({
      'identityType': ['', Validators.required],
      'identityNo': ['', Validators.required],
      'pinNo': ['', Validators.required],
      'firstName': ['', Validators.required],
      'middleName': [''],
      'lastName': ['', Validators.required],
      'dob': ['', Validators.required],
      'maritalStatus': ['', Validators.required],
      'dependents': ['', Validators.required],
      'contacts': this.formContacts
    });
  }

  ngOnInit() {
    this._memberService.memberObserver.subscribe((member: MemberResponse) => {
      if (member.postalAddress != undefined || member.residence != undefined)
        this.setFormValues(member);
      else
        this.form.reset();
    });
    this.form.get('identityNo').valueChanges.subscribe(value => {
      if (value != null || value != '')
        this.canEdit = true;
      else
        this.canEdit = false;
    })
  }
  public makeEditable() {
      this.isEditable = true;
  }
  delete() {
    console.log("Deleted.")
  }
  update(form: any) {
    this.isEditable = false;
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
  public get isFormInvalid(): boolean {
    return this.form.invalid
  }
  public get isNamesInvalid(): boolean {
    return (this.isTouched('firstName') && (this.isControlInValid('firstName', 'required'))) ||
      (this.isTouched('lastName') && (this.isControlInValid('lastName', 'required')));
  }
  public get isDependentsInvalid(): boolean {
    return (this.isTouched('dependents') && (this.isControlInValid('dependents', 'required')))
  }
  public get isMobileNoInvalid(): boolean {
    return (this.isNestedTouched('contacts', 'mobileNo') && (this.isNestedControlInValid('contacts', 'mobileNo', 'required')))
  }
  public get isEmailInvalid(): boolean {
    return (this.isNestedTouched('contacts', 'email') && (this.isNestedControlInValid('contacts', 'email', 'email')))
  }
  private setFormValues(member: MemberResponse) {
    this.form.get('identityType').setValue(member.identityType)
    this.form.get('identityNo').setValue(member.identityNo)
    this.form.get('pinNo').setValue(member.pinNo)
    this.form.get('firstName').setValue(member.firstName)
    this.form.get('middleName').setValue(member.firstName)
    this.form.get('lastName').setValue(member.lastName)
    this.form.get('dob').setValue(member.dob)
    this.form.get('maritalStatus').setValue(member.maritalStatus)
    this.form.get('dependents').setValue(member.dependents)

    this.form.get('contacts').get('mobileNo').setValue(member.mobileNo);
    this.form.get('contacts').get('email').setValue(member.email)

    this.form.get('contacts').get('number').setValue(member.postalAddress.number)
    this.form.get('contacts').get('code').setValue(member.postalAddress.code)

    this.form.get('contacts').get('residence').get('owned').setValue(member.residence.owned)
    this.form.get('contacts').get('residence').get('duration').setValue(member.residence.occupancyDuration)

    let address: string = member.residence.physicalAddress;
    let array: string[] = address.split(',')

    this.form.get('contacts').get('residence').get('estate').setValue(array[0])
    this.form.get('contacts').get('residence').get('street').setValue(array[1])
    this.form.get('contacts').get('residence').get('houseNo').setValue(array[2])
  }
  public get isFormValid(): boolean {
    return this.form.valid;
  }
}