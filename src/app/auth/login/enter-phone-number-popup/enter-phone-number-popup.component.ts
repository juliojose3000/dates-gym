import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ReserveService } from '../../../service/reserve.service';
import { User } from '../../../model/user.model';
import { Reservation } from '../../../model/reservation.model';
import { MyResponse } from '../../../model/myresponse.model';
import { DAYS_NAME, MONTHS_NAME } from '../../../utils/resources';
import { SpinnerService } from '../../../common/spinner/spinner.service';
import { Utils } from '../../../utils/utils';
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
    private spinnerService: SpinnerService,
    public datepipe: DatePipe) {
    dialogRef.disableClose = true; //This line disable close dialog when user clicks dialog outside
  }

  ngOnInit(): void {


  }

  submit() {
    if (!this.isValidNumber) return;
    this.spinnerService.resetSpinner();
    this.dialogRef.close({
      phoneNumber: this.phone.toString()
    });
  }


  dimissDialog() {
    this.phone = undefined;
    this.dialogRef.close();
  }

}
