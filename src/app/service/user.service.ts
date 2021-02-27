import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';
import { environment_variables } from "src/environments/environment.variables";
import { ResetPassword } from "../model/reset-password.model";

@Injectable()
export class UserService {

  private url = `${environment.url}/user`;

  constructor(private http: HttpClient) {}

  create(user: User){
    return this.http.post(this.url+'/create', user);
  }

  social_login(user: User){
    return this.http.post(this.url+'/social-login', user);
  }

  sendLinkResetPassword(email: string){
    return this.http.get<any>(this.url+'/send-link-reset-password?email='+email);
  }

  resetLink(resetPassword: ResetPassword){
    return this.http.post(this.url+'/reset-password', resetPassword);
  }

}