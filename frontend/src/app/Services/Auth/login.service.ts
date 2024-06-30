import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../../environment/env.prod";
import {Observable} from "rxjs";
import {LoginModel, LoginModelParams} from "../../Models/login.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = `${baseUrl}user/login`
  constructor(private _http: HttpClient) { }

  public loginUser(user: LoginModelParams): Observable<LoginModel> {
    return this._http.post<LoginModel>(this.url, user)
  }
}
