import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isGeoLang: boolean = true;

  changeLang() {
    this.isGeoLang = !this.isGeoLang;
  }
}
