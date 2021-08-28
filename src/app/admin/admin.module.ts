import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './schedule/modal/modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [UsersComponent, ScheduleComponent, ModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,

    //Material Imports
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
  ]
})
export class AdminModule { }
