import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoanOtherResponse } from '../models/responses/loanOtherResponse.model';

@Injectable({
  providedIn: 'root'
})
export class LoanOtherService {
  private url: string = "http://localhost:8080/api/loan/other/member"

  constructor(private _http: HttpClient) { }

  public getOtherLoans(identityNo: number): Observable<LoanOtherResponse[]> {
    return this._http.get<LoanOtherResponse[]>(this.url + '/' + identityNo);
  }
}
