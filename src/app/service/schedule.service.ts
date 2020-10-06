import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ScheduleService {

  private url = `${environment.localEnviroment}/schedule`;

  private TAG = "Schedule.service.ts"

  constructor(private http: HttpClient) {
  }
  
  get(headers){
    let header = new HttpHeaders().set(
      "Authorization",
      headers
    );
    console.log(this.TAG + " - El token es: " + headers)
    return this.http.get<Schedule>(this.url+'/get', {headers:header});
  }

}