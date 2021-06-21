import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReserveComponent } from './reserve/reserve.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { WeightRoomComponent } from './weight-room/weight-room.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EnableUserAccountComponent } from './enable-user-account/enable-user-account.component';


const routes: Routes = [
  { path: "reserve", component: ReserveComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "gym_services/weight_room", component: WeightRoomComponent },
  { path: "about_us", component: AboutusComponent },
  { path: "password_forgotten", component: PasswordForgottenComponent },
  { path: "reset_password", component: ResetPasswordComponent},
  { path: "user_profile", component: UserProfileComponent},
  { path: "enable_user_account", component: EnableUserAccountComponent },
  { path: "enable_user_account/:userEmail/:name/:phone", component: EnableUserAccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
