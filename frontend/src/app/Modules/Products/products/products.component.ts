import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProductsService} from "../../../Services/Products/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  productsData: any;

  constructor(private _productService: ProductsService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this._productService.getProducts()
      .subscribe((item: any) => {
        console.log(item);
      })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.productsData.paginator = this.paginator!;
  }

  ngOnDestroy() {
  }
}

