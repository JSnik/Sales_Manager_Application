import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {baseUrl} from "../../../../environment/env.prod";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = `${baseUrl}product`
  constructor(private _http: HttpClient) { }

  getProducts(): Observable<any> {
    return this._http.get(this.url)
  }
}
