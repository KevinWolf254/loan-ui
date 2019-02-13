import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountResponse } from '../models/responses/accountResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url: string = "http://localhost:8080/api/account"

  private accountSource = new BehaviorSubject<AccountResponse>(new AccountResponse());
  public accountObserver = this.accountSource.asObservable();

  constructor(private _http: HttpClient) { }

  public getAccount(identityNo: number): Observable<AccountResponse> {
    return this._http.get<AccountResponse>(this.url + '/' + identityNo);
  }
  public set account(account: AccountResponse) {
    this.accountSource.next(account);
  }
}
