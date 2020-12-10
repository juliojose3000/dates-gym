//Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

//Services
import { ReserveService } from './service/reserve.service';
import { ScheduleService } from './service/schedule.service';
import { UserService } from './service/user.service';
import { AuthenticationService } from './service/authentication.service'
import { SpinnerService } from './spinner/spinner.service'

//Components
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReserveComponent } from './reserve/reserve.component';
import { HomeComponent } from './home/home.component';
import { PopupComponent } from './popup/popup.component';
import { SpinnerComponent } from './spinner/spinner.component'

//Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

//Others
import { Utils } from './utils/utils';
import { AboutusComponent } from './aboutus/aboutus.component';
import { DatePipe } from '@angular/common'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ReserveComponent,
    HomeComponent,
    PopupComponent,
    MessageComponent,
    LoginComponent,
    SpinnerComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  providers: [ScheduleService, ReserveService, UserService, AuthenticationService, Utils, SpinnerService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent, MessageComponent]
})
export class AppModule { }
