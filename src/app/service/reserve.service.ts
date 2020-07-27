import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';



@Injectable()
export class ReserveService {

  private url = 'http://localhost:8080/cfc/api/schedule';

  constructor(private http: HttpClient) {
  }

  getSchedule(date: string, startHour: string){
    console.log(date+" "+startHour);
    //return this.http.get<Schedule>(this.url+'/reserve');
  }


}