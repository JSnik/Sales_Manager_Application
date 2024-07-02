import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {SalesManagersService} from "../../../Services/SalesManagers/sales-managers.service";
import {SalesManagersBaseModel} from "../../../Models/sales-managers.model";

@Component({
  selector: 'app-sales-managers',
  templateUrl: './sales-managers.component.html',
  styleUrls: ['./sales-managers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesManagersComponent implements OnInit, OnDestroy, AfterViewInit {
  public displayedColumns = ['position', 'username', 'firstName', 'lastName', 'register', 'totalSellingMoney'];
  public isAddModal: boolean = false;
  private managersData!: SalesManagersBaseModel;
  public dataSource = new MatTableDataSource<any>();
  private destroy$: Subject<boolean> = new Subject<boolean>();
  addManagerForm!: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private fb: FormBuilder, private _salesManagers: SalesManagersService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initializeAddForm();
    this.getAllSalesManagers();
  }

  initializeAddForm(): void {
    this.addManagerForm = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      surname: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  getAllSalesManagers(): void {
    this._salesManagers.getAllManagers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: SalesManagersBaseModel) => {
        this.managersData = resp;
        this.dataSource.data = resp.data;
        this.cdr.markForCheck();
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }


  getSearchedProduct($event: any) {
    if ($event.search) {
      this.filterData($event.search);
    } else {
      this.dataSource.data = [...this.managersData.data];
    }
  }

  filterData(val: string) {
    const filterValue = val.toLowerCase();
    this.dataSource.data = this.managersData.data.filter((item: any) =>
      item.username?.includes(filterValue) ||
      item.firstName?.includes(filterValue) ||
      item.lastName?.toString().includes(filterValue) ||
      item.register?.toString().includes(filterValue) ||
      item.totalSellingMoney?.toString().includes(filterValue)
    );
  }

  closeModal() {
    this.isAddModal = false;
    this.resetForm();
  }

  addManager() {
    const body = {
      username: this.addManagerForm.value.username,
      password: this.addManagerForm.value.password,
      passwordConfirm: this.addManagerForm.value.password,
      firstName: this.addManagerForm.value.name,
      lastName: this.addManagerForm.value.surname
    };
    this._salesManagers.createManager(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        this.getAllSalesManagers();
        this.resetForm();
        this.isAddModal = false;
        this.cdr.markForCheck();
      })
  }

  resetForm(): void {
    this.addManagerForm.reset({
      username: null,
      name: null,
      surname: null,
      password: null
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
