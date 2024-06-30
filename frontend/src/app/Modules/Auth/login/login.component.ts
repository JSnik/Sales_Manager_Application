import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../../Services/Auth/login.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Subject, takeUntil} from "rxjs";
import {LoginModel, LoginModelParams} from "../../../Models/login.model";

@Component({
  selector: 'app-auth-main',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy{
  // @ts-ignore
  public loginForm: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public loginNotSuccess: boolean = false;
  private emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(private fb: FormBuilder, private router: Router, private _loginService: LoginService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required,]],
      password: [null, Validators.required]
    })

    this.inputListener();
  }

  inputListener(): void {
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val: string) => {
      this.loginNotSuccess = false;
      this.cdr.markForCheck();
    })
  }

  submit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.login({email: email, password: password});
  }

  login(user: LoginModelParams): void {
    this._loginService.loginUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
    (resp: LoginModel) => {
          console.log(resp);
          this.loginNotSuccess = false;
          this.saveInSession('token', resp.token);
          this.saveInSession('id', resp.user._id);
          this.retirectAfterSuccessLogin();
          this.cdr.markForCheck();
        },
        (error: HttpErrorResponse) => {
          this.loginNotSuccess = true;
          this.cdr.markForCheck();
        }
      )
  }

  retirectAfterSuccessLogin(): void {
    this.router.navigate(['./products'])
  }

  saveInSession(name: string, val: string) {
    sessionStorage.setItem(name, val)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
