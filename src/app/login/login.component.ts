
import { Component, OnInit } from '@angular/core';
import { Authentication } from '../model/authentication.model';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Token } from '../model/token.model'
import { AuthenticationService } from '../service/authentication.service';
import { environment } from 'src/environments/environment';

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

  constructor(private userService: UserService, private authService: AuthenticationService) { }

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
    this.authService.authenticate(this.auth).subscribe((data: Token) => {
      this.token = data;
      console.log(this.token);
      localStorage.setItem("token","Bearer "+this.token.token)
    });
  } // login

  signUp(){

    this.user = new User(0, this.name, this.lastname, this.phone, this.email, this.username, this.password, false);

    console.log(this.user);

  }

}
