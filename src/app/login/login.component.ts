
import { Component, OnInit } from '@angular/core';
import { Authentication } from '../model/authentication.model';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Token } from '../model/token.model'
import { AuthenticationService } from '../service/authentication.service';
import { environment, errors } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MyResponse } from '../model/myresponse.model';
import { MessageComponent } from '../message/message.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name: string;
  public lastname: string;
  public phone: string;
  public email:string;
  public username: string;
  public password: string;

  private auth: Authentication;
  private token: Token;

  private mResponse: MyResponse;
  private user: User;

  constructor(
    private userService: UserService, 
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if(environment.quickpass){
      this.email = environment.email;
      this.password = environment.password;
    }

    this.codigojs();
  }

  codigojs(){

    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    
    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });
    
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

  }


  login() {
    this.auth = new Authentication(this.email, this.password);
    console.log(this.auth);
    const pInvalidCredentials = document.getElementById('invalid_credentials');
    this.authService.authenticate(this.auth).subscribe(
      (data: MyResponse) => {
        this.mResponse = data;

        if(this.mResponse.successful){
          this.saveUserSessionData(this.mResponse);
          this.router.navigate(['home']);
          pInvalidCredentials.style.visibility = "hidden";
        }

        else{
          console.log("Credenciales incorrectos");
          pInvalidCredentials.style.visibility = "visible";
        }
      },
      (error) => {//Error callback
        console.error('error caught in component')
        console.log(error);
      }
    );
  } // login

  signUp(){

    this.user = new User(0, this.name, this.phone, this.email, this.password);

    this.userService.create(this.user).subscribe(
      (data: MyResponse) => {
        this.mResponse = data;

        console.log(this.mResponse);

        if(this.mResponse.successful){

          this.saveUserSessionData(this.mResponse);

          //Muestro el resultado: Fallo o Éxito
          this.dialog.open(MessageComponent, {
            data: {
              title: "Éxito",
              message: "El registro se ha completado satisfactoriamente. A partir de ahora podrá hacer reservaciones para hacer uso de las instalaciones del Gimnasio Cachí Fitness Center",
              class: "pRegister"
            }
          }).afterClosed().subscribe( result => {
            this.router.navigate(['home']);
          });          
        }
        else{
  
          //Muestro el resultado: Fallo o Éxito
          this.dialog.open(MessageComponent, {
            data: {
              title: "Error",
              message: this.mResponse.message
            }
          });
        }
      },
      (error) => {//Error callback
        console.error('error caught in component')
        console.log(error);
      }
    );

  }

  saveUserSessionData(mResponse: MyResponse){
    this.user = mResponse.data as User;
    localStorage.setItem("token", "Bearer "+mResponse.token);
    localStorage.setItem("email", this.user.email);
    localStorage.setItem("userId", ""+this.user.id);
  }


}
