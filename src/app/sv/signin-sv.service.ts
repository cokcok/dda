import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
import { Observable,Subject } from 'rxjs';
import {employee} from '../models/signin_model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SigninSvService {
  
  private fooSubject = new Subject<any>();
  constructor(private http: HttpClient, private configSv: ConfigService) { }

  signin(username:string,password:string): Observable<employee> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'signin.php';
    let data;
    data = {
      'username': username,
      'password': password,
    }
    return this.http.post<employee>(apiUrl, data, { headers: header });
    }

     publishSomeData(data: any) {
      this.fooSubject.next(data);
    }

    getObservable(): Subject<any> {
        return this.fooSubject;
    } 


}
 