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

}
