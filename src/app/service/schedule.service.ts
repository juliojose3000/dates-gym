import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { environment } from '../../environments/environment';
import { MyResponse } from '../model/myresponse.model';

@Injectable()
export class ScheduleService {

  private url = `${environment.url}/schedule`;

  private TAG = "Schedule.service.ts"

  constructor(private http: HttpClient) {
  }
  
  get(token){
    let header = new HttpHeaders().set("Authorization", token);
    return this.http.get<MyResponse>(this.url+'/get', {headers:header});
  }

}