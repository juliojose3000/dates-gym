
import { Component, OnInit } from '@angular/core';
import { Authentication } from '../model/authentication.model';
import { User } from '../model/user.model';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';
import { Token } from '../model/token.model'

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.css']
})
export class NewloginComponent implements OnInit {

  public name: string;
  public lastname: string;
  public phone: string;
  public email:string;
  public username: string;
  public password: string;

  private user: User;
  private auth: Authentication;
  private token: Token;

  constructor(private userService: UserService, private loginService: LoginService) { }

  ngOnInit(): void {
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

  login(){
    console.log("login");
    console.log("email: "+this.email);
    console.log("password: "+this.password);

    this.auth = new Authentication("juliojose3000","123");

    console.log(this.auth);

    this.loginService.authenticate(this.auth).subscribe((data: any) => { this.token = data });

    console.log("La respuesta del server: "+this.token);

  }

  signUp(){

    this.user = new User(0, this.name, this.lastname, this.phone, this.email, this.username, this.password, false);

    console.log(this.user);

    //this.userService.make(this.user);

  }

}
