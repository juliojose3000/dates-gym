import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

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

  constructor(private userService: UserService) { }

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
  }

  signUp(){

    this.user = new User(0, this.name, this.lastname, this.phone, this.email, this.username, this.password, false);

    console.log(this.user);

    //this.userService.make(this.user);

  }

}
