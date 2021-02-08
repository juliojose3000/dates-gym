import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit {

  email: string;

  constructor() { }

  ngOnInit(): void {
  }

  click(){
    document.getElementById("div_form").style.display = "none";
    document.getElementById("p_description").style.display = "block";
  }

}
