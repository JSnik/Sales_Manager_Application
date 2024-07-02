import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {debounceTime, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit, OnDestroy{
  public input!: FormGroup;
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initializeForm();
    this.getVal();
  }

  initializeForm() {
    this.input = this.fb.group({
      search: [],
    })
  }

  getVal(): void {
    this.input.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300)
      )
      .subscribe((val: any) => {
      this.searchEmitter.emit(val);
      this.cdr.markForCheck();
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
