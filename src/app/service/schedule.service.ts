import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { environment } from '../../environments/environment';

@Injectable()
export class ScheduleService {

  private url = `${environment.localEnviroment}/schedule`;

  constructor(private http: HttpClient) {
  }
  
  get(){
    return this.http.get<Schedule>(this.url+'/get');
  }

}