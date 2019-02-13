import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoanComponent } from './loan/loan.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'loan', component: LoanComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
