import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageComponent } from 'src/app/message/message.component';
import { Strings } from 'src/app/resources/resources';

@Component({
  selector: 'app-weight-room',
  templateUrl: './weight-room.component.html',
  styleUrls: ['./weight-room.component.scss']
})
export class WeightRoomComponent implements OnInit {

  constructor(private router: Router, private popupMessage: MessageComponent, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  showSchedule(){

    if(localStorage.getItem("token")==null){

      this.dialog.open(MessageComponent, {
        data: {
          title: Strings.MAKE_LOGIN_TITLE,
          message: Strings.MAKE_LOGIN
        }
      });

      return;

    }

    this.router.navigate(['reserve']);
  }

}
