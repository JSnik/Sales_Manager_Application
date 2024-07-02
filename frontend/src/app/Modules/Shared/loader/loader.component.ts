import { Component } from '@angular/core';
import {LoadingService} from "../../../Services/Loader/loading.service";

@Component({
  selector: 'app-Loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) { }
}
