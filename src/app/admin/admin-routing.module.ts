import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnableUserAccountComponent } from './enable-user-account/enable-user-account.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: "schedule", component: ScheduleComponent },
  { path: "users", component: UsersComponent },
  { path: "enable_user_account/:userEmail/:name/:phone", component: EnableUserAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
