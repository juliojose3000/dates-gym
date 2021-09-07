import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleEnum } from 'src/app/model/enums/user-role.enum';
import { MyResponse } from 'src/app/model/myresponse.model';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { SpinnerService } from 'src/app/common/spinner/spinner.service';
import { Utils } from 'src/app/utils/utils';
import { SeeUserReservationsModal } from './modal/see-user-reservations.modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public customers: Array<User>;

  constructor(
    private userService: UserService,
    private utils: Utils,
    private spinnerService: SpinnerService,
    public dialog: MatDialog) {


    this.spinnerService.requestStarted();
    this.userService.getAll().subscribe((mResponse: MyResponse) => {
      console.log(mResponse);
      this.spinnerService.resetSpinner();
      this.customers = mResponse.data as Array<User>;
    },
      (error: HttpErrorResponse) => {//Error callback
        console.log(error.message);
        this.spinnerService.resetSpinner();
        this.utils.showErrorMessage()
      });


  }

  ngOnInit(): void {

  }

  getRoleByCode(code) {
    switch (code) {
      case UserRoleEnum.ADMIN:
        return "Administrador";
      case UserRoleEnum.CUSTOMER:
        return "Cliente";
    }
  }

  seeUserReservations(customerId) {
    let customerSelected;
    this.customers.forEach(customer => {
      if(customer.id == customerId){
        customerSelected = customer;
      }
    });

    //Habro un modal
    this.dialog.open(SeeUserReservationsModal, {
      data: {
        customer: customerSelected
      }
    });

  }


}
