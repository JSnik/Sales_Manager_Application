import { Injectable } from '@angular/core';
import {baseUrl} from "../../../../environment/env.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductsModel} from "../../Models/products.model";

@Injectable({
  providedIn: 'root'
})
export class SoldProductsService {
  private url: string = `${baseUrl}soldProduct`;
  constructor(private _http: HttpClient) { }

  getAllSoldProducts(): Observable<ProductsModel>{
    return this._http.get<ProductsModel>(this.url);
  }

  getSpecificUserSoldProducts(userId: string): Observable<ProductsModel>{
    const params = new HttpParams()
      .set('user', userId)
      return this._http.get<ProductsModel>(this.url, {params});
  }
}
