import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, Subject } from 'rxjs';
import { employee } from '../models/signin_model';
import { data } from '../models/data_model';
import { HttpClient } from '@angular/common/http';
import { FeedBack } from '../models/feedback';
@Injectable({
  providedIn: 'root'
})
export class SigninSvService {

  private fooSubject = new Subject<any>();private fooSubject1 = new Subject<any>(); 
  constructor(private http: HttpClient, private configSv: ConfigService) { }

  signin(username: string, password: string, token?): Observable<employee> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'signin.php';
    let data;
    data = {
      'username': username,
      'password': password,
      'token': token,
    }
    return this.http.post<employee>(apiUrl, data, { headers: header });
  }

  publishSomeData(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }

 

  getchpass(id: number,type_sql:string): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'chpass.php';
    let data;
    data = {
      'id': id,
      'type_sql': type_sql
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudchpass(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'chpass.php';
    let data;
    if (type === 'chdata'){
      data = {
        'id': vdata.id,
        'prefix_name': vdata.prefix_name,
        'name': vdata.name,
        'surname': vdata.surname,
        'pic': vdata.picresizbase64List,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }
    }else if(type === 'chpass'){
      data = {
        'id': vdata.id,
        'oldpass': vdata.oldpass,
        'newpass': vdata.newpass,
        'emp_id': this.configSv.emp_id,
        'type_sql': type
      }

    }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

  publishSomeData1(data: any) {
    this.fooSubject1.next(data);
  }

  getObservable1(): Subject<any> {
    return this.fooSubject1;
  }

 
}
