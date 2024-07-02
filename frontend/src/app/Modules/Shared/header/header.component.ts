import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isGeoLang: boolean = true;

  constructor(private router: Router) {}

  changeLang() {
    this.isGeoLang = !this.isGeoLang;
  }

  logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    this.router.navigate(['../login']);
  }

  protected readonly sessionStorage = sessionStorage;
}
