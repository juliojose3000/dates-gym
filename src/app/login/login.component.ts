
import { Component, OnInit } from '@angular/core';
import { Authentication } from '../model/authentication.model';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Token } from '../model/token.model'
import { AuthenticationService } from '../service/authentication.service';
import { environment, errors } from 'src/environments/environment';
import { Router } from '@angular/router';

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

  private user: User;
  private auth: Authentication;
  private token: Token;

  constructor(
    private userService: UserService, 
    private authService: AuthenticationService,
    private router: Router) { }

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
      (data: Token) => {
        this.token = data;
        console.log(this.token);
        if(errors.INVALID_CREDENTIALS==this.token.token){
          console.log("Credenciales incorrectos");
          pInvalidCredentials.style.visibility = "visible";
        }
        else{
          localStorage.setItem("token","Bearer "+this.token.token);
          localStorage.setItem("email", this.email);
          this.router.navigate(['home']);
          pInvalidCredentials.style.visibility = "hidden";
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

    console.log(this.user);

  }

}
