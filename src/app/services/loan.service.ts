import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoanResponse } from '../models/responses/loanResponse.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private url: string = "http://localhost:8080/api/loan"

  private loanSource = new BehaviorSubject<LoanResponse[]>([]);
  public loanObserver = this.loanSource.asObservable();

  constructor(private _http: HttpClient) { }

  public getLoanApplications(identityNo: number): Observable<LoanResponse[]> {
    return this._http.get<LoanResponse[]>(this.url + '/' + identityNo);
  }
  public set loanApplications(loan: LoanResponse[]) {
    this.loanSource.next(loan);
  }
}
