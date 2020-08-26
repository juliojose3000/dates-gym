import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import * as $ from "jquery";
import { User } from '../model/user.model';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.loginJS();

  }

  loginJS(){

    $(document).ready(function() {
      var panelOne = $('.form-panel.two').height(),
        panelTwo = $('.form-panel.two')[0].scrollHeight;
    
      $('.form-panel.two').not('.form-panel.two.active').on('click', function(e) {
        e.preventDefault();
    
        $('.form-toggle').addClass('visible');
        $('.form-panel.one').addClass('hidden');
        $('.form-panel.two').addClass('active');
        $('.form').animate({
          'height': panelTwo
        }, 200);
      });
    
      $('.form-toggle').on('click', function(e) {
        e.preventDefault();
        $(this).removeClass('visible');
        $('.form-panel.one').removeClass('hidden');
        $('.form-panel.two').removeClass('active');
        $('.form').animate({
          'height': panelOne
        }, 200);
      });
    });

  }


  login(){

    console.log("login");

  }

  register(){

    this.user = new User(0, this.name, this.lastname, this.phone, this.email, this.username, this.password, false);

    console.log(this.user);

    this.userService.make(this.user);

  }


}
