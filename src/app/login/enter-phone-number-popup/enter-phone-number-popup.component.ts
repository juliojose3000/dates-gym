import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReserveService } from '../../service/reserve.service';
import { User } from '../../model/user.model';
import { Reservation } from '../../model/reservation.model';
import { MyResponse } from '../../model/myresponse.model';
import { DAYS_NAME, MONTHS_NAME } from '../../resources/resources';
import { SpinnerService } from '../../spinner/spinner.service';
import { Utils } from '../../utils/utils';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'enter-phone-number-popup.component',
  templateUrl: './enter-phone-number-popup.component.html',
  styleUrls: ['./enter-phone-number-popup.component.scss']
})
export class EnterPhoneNumberPopupComponent implements OnInit {

  phone: string;
  isValidNumber: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<EnterPhoneNumberPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reserveService: ReserveService,
    private spinnerService: SpinnerService,
    private utils: Utils,
    public datepipe: DatePipe) {
    dialogRef.disableClose = true; //This line disable close dialog when user clicks dialog outside
  }

  ngOnInit(): void {


  }

  submit() {
    if (!this.isValidNumber) return;
    this.spinnerService.resetSpinner();
    this.dialogRef.close({
      phoneNumber: this.phone
    });
  }


  dimissDialog() {
    this.phone = undefined;
    this.dialogRef.close();
  }

  keyupEvent(el: HTMLInputElement) {
    var element = el.name;
    var value = el.value;

    switch (element) {

      case "phone":
        if (this.utils.isAValidPhoneNumber(this.phone)) {
          document.getElementById("phone_point_popup").setAttribute("src", "../../assets/img/right_input.png");
          this.isValidNumber = true;
        }
        else if (value == "") {
          document.getElementById("phone_point_popup").setAttribute("src", "../../assets/img/point_gray.png");
          this.isValidNumber = false;
        } else {
          document.getElementById("phone_point_popup").setAttribute("src", "../../assets/img/bad_input.png");
          this.isValidNumber = false;
        }
        break;

    }

  }

}
