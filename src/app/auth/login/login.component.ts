import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../service/account-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Authentication } from 'src/app/model/authentication.model';
import { Token } from 'src/app/model/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  auth: Authentication;
  token: Token;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  login() {
    console.log("making login...");
    this.auth = new Authentication(this.f.username.value, this.f.password.value);
    console.log(this.auth);
    this.authenticationService.authenticate(this.auth).subscribe((data: Token) => {
      this.token = data;
      console.log(this.token);
    });
  } // login
}
