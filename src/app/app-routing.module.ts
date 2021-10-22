import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReserveComponent } from './customer/reserve/reserve.component';
import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { WeightRoomComponent } from './customer/weight-room/weight-room.component';
import { AboutusComponent } from './common/aboutus/aboutus.component';
import { PasswordForgottenComponent } from './auth/password-forgotten/password-forgotten.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UserProfileComponent } from './customer/user-profile/user-profile.component';
import { AdminGuard } from './guards/admin.guard';
import { UserRoleEnum } from './model/enums/user-role.enum';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "gym_services/weight_room", component: WeightRoomComponent },
  { path: "about_us", component: AboutusComponent },
  { path: "password_forgotten", component: PasswordForgottenComponent },
  { path: "reset_password", component: ResetPasswordComponent },
  {
    path: "reserve",
    canActivate: [AdminGuard],
    data: { allowedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.ASSISTANT, UserRoleEnum.CUSTOMER] },
    component: ReserveComponent
  },
  {
    path: "user_profile",
    canActivate: [AdminGuard],
    data: { allowedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.ASSISTANT, UserRoleEnum.CUSTOMER] },
    component: UserProfileComponent
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    data: { allowedRoles: [UserRoleEnum.ADMIN, UserRoleEnum.ASSISTANT] },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) //Lazy load admin module
  },
  { path:'**', component: HomeComponent }, //If the route not exists, so redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
