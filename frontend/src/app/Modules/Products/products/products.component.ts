import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ProductsService} from "../../../Services/Products/products.service";
import {Subject, takeUntil} from "rxjs";
import {productModel, ProductsModel} from "../../../Models/products.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit{
  public displayedColumns = ['position', 'name', 'price', 'amount'];
  private productsData!: ProductsModel;
  public dataSource = new MatTableDataSource<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public clickedRowIndex: number = -1;
  public chosenProduct!: productModel;
  public isAddModal: boolean = false;
  public isEditModal: boolean = false;
  public isSellModal: boolean = false;
  addForm!: FormGroup;
  editForm!: FormGroup;
  sellForm!: FormGroup

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private _productService: ProductsService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {}

  ngOnInit() {
    this.getAllProducts();
    this.initializeForm();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  initializeForm(): void {
    const englishLettersPattern = /^[a-zA-Z\s]*$/;
    this.addForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(englishLettersPattern)]],
      amount: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
    this.editForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(englishLettersPattern)]],
      amount: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
    this.sellForm = this.fb.group({
      amount: [null, [Validators.required]],
    })
  }

  getAllProducts(): void {
    this._productService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: ProductsModel) => {
        this.productsData = item;
        this.dataSource.data = item.data;
        this.cdr.markForCheck();
      })
  }

  getRow(row: productModel, index: number) {
    if (this.clickedRowIndex === -1) {
      this.clickedRowIndex = index;
      this.chosenProduct = row;
    } else {
      this.clickedRowIndex = -1;
    }
  }

  getSearchedProduct($event: any) {
    if ($event.search) {
      this.filterData($event.search);
    } else {
      this.dataSource.data = [...this.productsData.data];
    }
  }

  filterData(val: string) {
    const filterValue = val.toLowerCase();
    this.dataSource.data = this.productsData.data.filter((item: any) =>
      item.title.en.toLowerCase().includes(filterValue) ||
      item.title.ka.includes(filterValue) ||
      item.amount.toString().includes(filterValue) ||
      item.price.toString().includes(filterValue)
    );
  }

  closeModal() {
    this.isAddModal = false;
    this.isEditModal = false;
    this.isSellModal = false;
    this.resetState();
  }

  deleteProduct() {
    this._productService.deleteProduct(this.chosenProduct._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: null) => {
        this.getAllProducts();
        this.resetState();
        this.cdr.markForCheck();
      })
  }

  addProducts() {
    const name = this.addForm.value.name;
    const amount = this.addForm.value.amount;
    const price = this.addForm.value.price
    const userId = sessionStorage.getItem('id')
    this._productService.addProduct({
      title: {
        en: name,
        ka: name
      },
      user: userId,
      totalAmount: amount,
      price: price
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: productModel) => {
        this.getAllProducts();
        this.isAddModal = false;
        this.resetState()
        this.cdr.markForCheck();
      })
  }

  editProducts(): void {
    this.chosenProduct.totalAmount = this.chosenProduct.amount;
    this._productService.editProduct(this.chosenProduct._id, this.chosenProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: productModel) => {
        this.getAllProducts();
        this.isEditModal = false;
        this.resetState();
        this.resetChosenObj();
        this.cdr.markForCheck();
      })
  }

  sellProducts(): void {
    const userId: string = sessionStorage.getItem('id')!;
    const productObj = {
      user: userId,
      amount: +this.sellForm.value.amount
    };
    this._productService.sellProduct(this.chosenProduct._id, productObj)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: { status: string }) => {
        this.getAllProducts();
        this.isSellModal = false;
        this.resetState();
        this.resetChosenObj();
        this.cdr.markForCheck();
      })
  }

  resetState(): void {
    this.clearForm();
    this.clickedRowIndex = -1;
  }

  resetChosenObj(): void {
    this.chosenProduct = {
      title: {
        en: '',
        ka: ''
      },
      _id: '',
      price: 0,
      totalAmount: 0,
      amount: 0,
      createdAt: '',
      soldDate: '',
    };
  }

  clearForm() {
    this.addForm.reset({
      name: null,
      amount: null,
      price: null
    });
    this.sellForm.reset({
      amount: null,
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

