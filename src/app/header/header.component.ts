import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Strings } from '../resources/resources';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const session = document.getElementById("a_session");
    const session2 = document.getElementById("a_session2");
    if(localStorage.getItem('token')==null){//There is an active session
      session.innerHTML = Strings.LOGIN;
      session2.innerHTML = Strings.LOGIN;
    }else{
      session.innerHTML = Strings.LOGOUT;
      session2.innerHTML = Strings.LOGOUT;
    }

    const headerHeight = document.getElementById('container2').style.height;
    console.log(headerHeight);

  }

  session(){

    const session = document.getElementById("a_session");
    const session2 = document.getElementById("a_session2");
    if(session.innerHTML == Strings.LOGIN){
      this.router.navigate(['login']);
    }else{
      localStorage.setItem("token", null);
      session.innerHTML = Strings.LOGIN;
      session2.innerHTML = Strings.LOGIN;
      this.router.navigate(['login']);
    }
  }

  goToWeightRoom(){
    this.router.navigate(['gym_services/weight_room']);
    const element = document.getElementById("div_weight_room");
    element.style.display = "none";
    console.log(element);
  }

  goToHome(){
    this.router.navigate(['home']);
  }

  aboutUs(){
    this.router.navigate(['aboutUs']);
  }

}
