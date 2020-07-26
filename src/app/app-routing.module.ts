import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReserveComponent } from './reserve/reserve.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: "reserve", component: ReserveComponent },
  { path: "home", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
