import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weight-room',
  templateUrl: './weight-room.component.html',
  styleUrls: ['./weight-room.component.scss']
})
export class WeightRoomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showSchedule(){this.router.navigate(['reserve']);}

}
