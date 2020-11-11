import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  private url = `${environment.localEnviroment}/user`;

  constructor(private http: HttpClient) {
  }

  create(user: User){
    return this.http.post(this.url+'/create', user);
  }

}