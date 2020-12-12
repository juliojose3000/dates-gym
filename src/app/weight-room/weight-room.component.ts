import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { Strings } from '../resources/resources';

@Component({
  selector: 'app-weight-room',
  templateUrl: './weight-room.component.html',
  styleUrls: ['./weight-room.component.scss']
})
export class WeightRoomComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showSchedule(){

    if(localStorage.getItem("token")=='null' || localStorage.getItem("token")==null){
      this.dialog.open(MessageComponent, {
        data: {
          title: Strings.LOGIN,
          message: Strings.MAKE_LOGIN
        }
      });
      return;
    }

    this.router.navigate(['reserve']);
  }

}
