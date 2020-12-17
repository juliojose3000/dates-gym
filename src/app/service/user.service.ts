import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';
import { environment_variables } from "src/environments/environment.variables";

@Injectable()
export class UserService {

  private url: string;

  constructor(private http: HttpClient) {
    if(environment.production)
      this.url = `${environment_variables.azure_url}/user`;
    else
      this.url = `${environment_variables.environment}/user`;
  }

  create(user: User){
    return this.http.post(this.url+'/create', user);
  }

}