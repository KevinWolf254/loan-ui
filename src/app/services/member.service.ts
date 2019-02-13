import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MemberResponse } from '../models/responses/memberResponse.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private url: string = "http://localhost:8080/api/member"

  private memberSource = new BehaviorSubject<MemberResponse>(new MemberResponse());
  public memberObserver = this.memberSource.asObservable();

  constructor(private _http: HttpClient) { }

  public getMemberDetails(identityNo: number): Observable<MemberResponse> {
    return this._http.get<MemberResponse>(this.url + '/' + identityNo);
  }

  public set member(member: MemberResponse) {
    this.memberSource.next(member);
  }
}
