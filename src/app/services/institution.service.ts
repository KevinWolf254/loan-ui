import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { InstitutionResponse } from '../models/responses/institutionResponse.model';
import { InstitutionIncomeResponse } from '../models/responses/institutionIncomeResponse.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private url: string = "http://localhost:8080/api/institution/member";
  private url2: string = "http://localhost:8080/api/income/institution/member";

  private institutionSource = new BehaviorSubject<InstitutionResponse>(new InstitutionResponse());
  public institutionObserver = this.institutionSource.asObservable();

  private institutionIncomeSource = new BehaviorSubject<InstitutionIncomeResponse[]>([]);
  public institutionIncomeObserver = this.institutionIncomeSource.asObservable();

  constructor(private _http: HttpClient) { }

  public getInstitutionDetails(identityNo: number): Observable<InstitutionResponse> {
    return this._http.get<InstitutionResponse>(this.url + '/' + identityNo);
  }
  public getInstitutionIncomes(identityNo: number): Observable<InstitutionIncomeResponse[]> {
    return this._http.get<InstitutionIncomeResponse[]>(this.url2 + '/' + identityNo);
  }
  public set institution(institution: InstitutionResponse) {
    this.institutionSource.next(institution);
  }
  public set incomes(incomes: InstitutionIncomeResponse[]) {
    this.institutionIncomeSource.next(incomes);
  }
}
