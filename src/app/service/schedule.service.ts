import { Injectable, Inject, EventEmitter} from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule.model';
import { environment } from '../../environments/environment';
import { MyResponse } from '../model/myresponse.model';
import { environment_variables } from "src/environments/environment.variables";

@Injectable()
export class ScheduleService {

  private url: string;

  constructor(private http: HttpClient) {
    if(environment.production)
      this.url = `${environment_variables.azure_url}/schedule`;
    else
      this.url = `${environment_variables.environment}/schedule`;
  }
  
  get(token){
    let header = new HttpHeaders().set("Authorization", token);
    return this.http.get<MyResponse>(this.url+'/get', {headers:header});
  }

}