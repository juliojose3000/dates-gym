import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';



@Injectable()
export class ScheduleService {

  private url = 'http://localhost:8086/gymcachi/schedule';

  constructor(private http: HttpClient) {
  }

  getSchedule() {
    return this.http.get<Schedule>(this.url+'/get');
  }


}