import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../../environment/env.prod";
import {Observable} from "rxjs";
import {SalesManagersBaseModel} from "../../Models/sales-managers.model";

@Injectable({
  providedIn: 'root'
})
export class SalesManagersService {
  private url: string = baseUrl;
  constructor(private _http: HttpClient) { }

  getAllManagers(): Observable<SalesManagersBaseModel> {
    const url = `${this.url}user`;
    return this._http.get<SalesManagersBaseModel>(url)
  }

  createManager(body: any): Observable<any> {
    const url = `${this.url}user/signup`
    return this._http.post<any>(url, body)
  }
}
