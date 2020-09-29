import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReserveComponent } from './reserve/reserve.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { NewloginComponent } from './newlogin/newlogin.component';


const routes: Routes = [
  { path: "reserve", component: ReserveComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "newlogin", component: NewloginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
