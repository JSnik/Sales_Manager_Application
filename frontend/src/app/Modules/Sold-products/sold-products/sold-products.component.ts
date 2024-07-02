import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {SoldProductsService} from "../../../Services/SoldProducts/sold-products.service";
import {SoldProductModel} from "../../../Models/sold-product.model";
import {ProductsModel} from "../../../Models/products.model";

@Component({
  selector: 'app-Sold-products',
  templateUrl: './sold-products.component.html',
  styleUrls: ['./sold-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SoldProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  public displayedColumns = ['position', 'name', 'price', 'amount', 'soldAt'];
  private soldProductsData!: ProductsModel;
  public dataSource = new MatTableDataSource<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public mySalesShown: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private cdr: ChangeDetectorRef, private _soldProductsService: SoldProductsService) {}

  ngOnInit() {
    this.getAllSoldProducts();
  }

  getAllSoldProducts(): void {
    this._soldProductsService.getAllSoldProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: ProductsModel) => {
        this.soldProductsData = resp;
        this.dataSource.data = resp.data;
        this.mySalesShown = false;
        this.cdr.markForCheck();
      })
  }

  mySales() {
    const id = sessionStorage.getItem('id')!;
    this._soldProductsService.getSpecificUserSoldProducts(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: ProductsModel) => {
        this.soldProductsData.data = [];
        this.dataSource.data = [];
        this.soldProductsData = resp;
        this.dataSource.data = resp.data;
        this.mySalesShown = true;
        this.cdr.markForCheck();
      })
  }

  allSales() {
    this.soldProductsData.data = [];
    this.dataSource.data = [];
    this.getAllSoldProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  getSearchedProduct($event: any) {
    if ($event.search) {
      this.filterData($event.search);
    } else {
      this.dataSource.data = [...this.soldProductsData.data];
    }
  }

  filterData(val: string) {
    const filterValue = val.toLowerCase();
    this.dataSource.data = this.soldProductsData.data.filter((item: any) =>
      item?.product?.title?.en.toLowerCase().includes(filterValue) ||
      item?.product?.title?.ka.includes(filterValue) ||
      item?.product?.amount.toString().includes(filterValue) ||
      item?.product?.price.toString().includes(filterValue) ||
      item?.createdAt?.toString().includes(filterValue)
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
