import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReserveComponent } from './reserve/reserve.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WeightRoomComponent } from './weight-room/weight-room.component';
import { AboutusComponent } from './aboutus/aboutus.component';


const routes: Routes = [
  { path: "reserve", component: ReserveComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "gym_services/weight_room", component: WeightRoomComponent },
  { path: "about_us", component: AboutusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
