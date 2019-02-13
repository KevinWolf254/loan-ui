import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoanComponent } from './loan/loan.component';
import { InstitutionComponent } from './institution/institution.component';
import { MemberComponent } from './member/member.component';
import { EmploymentDetailsComponent } from './employment-details/employment-details.component';
import { LoanInformationComponent } from './loan/loan-information/loan-information.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoanService } from './services/loan.service';
import { MemberService } from './services/member.service';
import { InstitutionService } from './services/institution.service';
import { EmployeeService } from './services/employee.service';
import { AccountService } from './services/account.service';
import { LoanOtherService } from './services/loanOther.service';
import { NgDisableDirective } from './directives/ng-disable.directive';
import { InstitutionIncomeComponent } from './institution/institution-income/institution-income.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoanComponent,
    InstitutionComponent,
    MemberComponent,
    EmploymentDetailsComponent,
    LoanInformationComponent,
    NgDisableDirective,
    InstitutionIncomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoanService,
    MemberService,
    InstitutionService,
    EmployeeService,
    AccountService,
    LoanOtherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
